import React, { useState } from 'react'
import { useAuth } from '../../contexts/ContextComp'
import { db } from '../../firebase/firebase'
import { useHistory } from 'react-router-dom'

const NavigationBar = () => {

    // useState
    const [newAlbum, setNewAlbum] = useState("")
    const [error, setError] = useState(false)
    const history = useHistory()

    // Context
    const { logout, currentUser } = useAuth()

    // General Functions
    const albumNameChange = (e) => {
        setNewAlbum(e.target.value)
    }

    const handleLogout = () => {
        logout()
    }

    const createAlbum = async () => {
        if(!newAlbum) {
            return
        }

        try {
            const albumRef = await db.collection('albums').add({
                name: newAlbum,
                owner: currentUser.uid
            })
            history.push(`/home/albums/${albumRef.id}`)
        } catch (e) {
            setError(e.message)

        }

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
