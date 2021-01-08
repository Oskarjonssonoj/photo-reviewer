import React, { useState } from 'react'
import firebase from 'firebase'
import { db, storage } from '../../firebase/firebase'

const NewPhoto = ({currentAlbum}) => {

    const [file, setFile] = useState(null)

    const onFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const onUpload = async () => {
        const storageRef = storage.ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        db.collection("albums").doc(currentAlbum).update({
            images: firebase.firestore.FieldValue.arrayUnion({
                name: file.name,
                url: await fileRef.getDownloadURL()
            })
        })
    }

    return (
        <div>
            <input type="file" onChange={onFileChange} />
            <button onClick={onUpload}>Upload Image</button>
        </div>
    )
}

export default NewPhoto
