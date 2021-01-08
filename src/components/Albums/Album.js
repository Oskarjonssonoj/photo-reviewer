import React, { useState, useEffect } from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import NewPhoto from '../Photos/NewPhoto'
import {db, storage} from '../../firebase/firebase'

const Album = () => {

    const [images, setImages] = useState([])
    const [albumName, setAlbumName] = useState("")

    const match = useRouteMatch("/:album")
    const { album } = match.params

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
        <p>Go back to <Link to="/">Home Page</Link></p>
        {
            images.map((image, index) => {
                return (
                    <>
                        <div className="eachImage" key={image.name}>
                            <img src={image.url}/>
                        </div>
                    </>
                )
            })
        }
            <div>
                <NewPhoto currentAlbum={album} />
            </div>
        </div>
    </>
    )
}

export default Album
