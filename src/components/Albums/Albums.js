import React, { useState, useEffect } from 'react'
import './styles/albums.scss'
import {db} from '../../firebase/firebase'
import { Switch, Route, Link } from 'react-router-dom'

const Albums = () => {

    const [albums, setAlbums] = useState([])

    useEffect(() => {
        const unmount = db.collection('albums').onSnapshot((snapshot) => {
            const snapAlbum = []
            snapshot.forEach(doc => {
                snapAlbum.push({...doc.data(), id: doc.id});
            })
            setAlbums(snapAlbum)
        })
        return unmount;
    }, [])

    
    return (
        <div className="albums">

        {
            albums.map((album, index) => {

                console.log(album)
                return (
                    <Link to={`/home/albums/${album.id}`}>
                        <div className="eachAlbum" key={album.name}>
                            <h2>{album.name}</h2>
                            <img src={album.images ? album.images[0].url : ""}/>
                            <p>Photos: 3</p>
                        </div>
                    </Link>
                )
            })
        }
        </div>
    )
}

export default Albums
