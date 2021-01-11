import React, { useState } from 'react'
import { useAuth } from '../../contexts/ContextComp'
import { db } from '../../firebase/firebase'

const NavigationBar = () => {

    // useState
    const [newAlbum, setNewAlbum] = useState("")

    // Context
    const { logout } = useAuth()

    // General Functions
    const albumNameChange = (e) => {
        setNewAlbum(e.target.value)
    }

    const handleLogout = () => {
        logout()
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
        <div>
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
        </div>
    )
}

export default NavigationBar
