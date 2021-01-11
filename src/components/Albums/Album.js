import React, { useState, useEffect } from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import NewPhoto from '../Photos/NewPhoto'
import './styles/albums.scss'
import {db, storage} from '../../firebase/firebase'

import { Box, Image, Text } from "@chakra-ui/react"
import DropzoneUpload from '../Photos/DropzoneUpload'

const Album = () => {

    const [images, setImages] = useState([])
    const [albumName, setAlbumName] = useState("")

    const match = useRouteMatch("/home/albums/:album")
    const { album } = match.params

    console.log('this is image', images)

    useEffect(() => {
        const unmount = db.collection('albums').doc(album).onSnapshot((doc) => {
            setImages(doc.data().images || [])
            setAlbumName(doc.data().name)
        })
        return unmount;
    }, [])


    return (
    <>
        <div className="images">
            <h1>{albumName}</h1>
            <p>Go back to <Link to="/home/albums">Home Page</Link></p>
            {/* <div>
                <NewPhoto currentAlbum={album} />
            </div> */}
            <DropzoneUpload />
            <div className="imgContainer">
                {
                    images.map((image, index) => {
                        return (
                            <>
                                <Box w="200px" h="300px" borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white" m={4}>
                                    <Image src={image.url} alt="Segun Adebayo" boxSize="200px" objectFit="cover" />
                                    <Box
                                        mt="1"
                                        fontWeight="semibold"
                                        lineHeight="tight"
                                        isTruncated
                                         >
                                        <Text fontSize="xs">{image.name}</Text>
                                     </Box>
                                </Box>
                            </>
                        )
                    })
                }
            </div>
        </div>
    </>
    )
}

export default Album