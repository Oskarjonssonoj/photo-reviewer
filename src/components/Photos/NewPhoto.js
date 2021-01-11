import React, { useState } from 'react'
import firebase from 'firebase'
import { db, storage } from '../../firebase/firebase'
import { Progress } from "@chakra-ui/react"

import { Button, ButtonGroup } from "@chakra-ui/react"



const NewPhoto = ({currentAlbum}) => {

    const [file, setFile] = useState(null)
    const [alertMsg, setAlertMsg] = useState(null)
    const [uploadProgress, setUploadProgress] = useState(null)

    const onFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const onUpload = async e => {
        e.preventDefault()

        const storageRef = storage.ref()
        const fileRef = storageRef.child(file.name)
        const uploadTask = fileRef.put(file)
        
        uploadTask.on('state_change', taskSnapshot =>{
            setUploadProgress((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100);
            console.log('uploadProgress')
        })
        await uploadTask.then( snapshot =>{
            console.log('file has been upload', snapshot)
            setAlertMsg({
                type: 'success',
                msg: "Image successfully uploaded"
            })
        }).catch( error =>{
            console.log('file upload a error', error)
            setAlertMsg({
                type: 'warning',
                msg: `Image could not be uploaded due to an error ${error.code}`
            })
        })
        
        
        db.collection("albums").doc(currentAlbum).update({
            images: firebase.firestore.FieldValue.arrayUnion({
                name: file.name,
                url: await fileRef.getDownloadURL()
            })
        })
    }

    return (
        <>
            <div>
                <input type="file" onChange={onFileChange} />
                {
                    alertMsg && (<div>{alertMsg.msg}</div>)
                }
            </div>
                {
                    uploadProgress && (<Progress value={uploadProgress} size="xs" colorScheme="pink" />)
                }
            <Button 
                onClick={onUpload} 
                colorScheme="green" 
                size="lg" 
                width="600px" 
                > Upload image </Button>
        </>
    )
}

export default NewPhoto
