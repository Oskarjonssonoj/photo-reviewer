import React, { useState, useEffect } from 'react'
import './styles/albums.scss'
import AlbumCoverOne from './images/one.png'
import {db, storage} from '../../firebase/firebase'
import { Switch, Route, Link } from 'react-router-dom'

const Albums = ({albums}) => {

    return (
        <div className="albums">

        {
            albums.map((album, index) => {
                return (
                    <Link to={`/${album.id}`}>
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
