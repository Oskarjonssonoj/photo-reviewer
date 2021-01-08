import React, { useState } from 'react'
import './styles/startpage.scss'
import Albums from '../Albums/Albums'
import {db, storage} from '../../firebase/firebase'


const Startpage = ({handleLogout}) => {

    const [newAlbum, setNewAlbum] = useState("")

    const albumNameChange = (e) => {
        setNewAlbum(e.target.value)
    }

    const createAlbum = () => {
        if(!newAlbum) {
            return
        }
        db.collection('albums').doc(newAlbum).set({
            name: newAlbum
        })
        setNewAlbum("")
    }

    return (
        <div className="startpage">
            <nav>
                <h2>Welcome</h2>
                <div className="topBtns">
                    <div className="addAlbumSection">
                        <input placeholder="Album name..." type="text" value={newAlbum} onChange={albumNameChange}/>
                        <button 
                            className="addAlbum" 
                            onClick={createAlbum}>Add Album</button>
                    </div>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </nav>
            
            <div className="albumsSection">
                <Albums />
            </div>

        </div>
    )
}

export default Startpage
