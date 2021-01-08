import React, { useState, useEffect } from 'react'
import './styles/albums.scss'
import AlbumCoverOne from './images/one.png'
import {db, storage} from '../../firebase/firebase'

const Albums = () => {

    const [albums, setAlbums] = useState([])

    useEffect(() => {
        db.collection('albums').onSnapshot((snapshot) => {
            const snapAlbum = []
            snapshot.forEach(doc => {
                snapAlbum.push({...doc.data(), id: doc.id});
            })
            setAlbums(snapAlbum)
        })
    }, [])

    return (
        <div className="albums">

        {
            albums.map((album, index) => {
                return (
                    <div className="eachAlbum" key={album.name}>
                        <h2>{album.name}</h2>
                        <img src={album.image}/>
                        <p>Photos: 3</p>
                    </div>
                )
            })
        }
        </div>
    )
}

export default Albums
