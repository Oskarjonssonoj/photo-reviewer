import React, { useState, useEffect } from 'react'
import './styles/startpage.scss'
import Albums from '../Albums/Albums'
import Album from '../Albums/Album'
import {db, storage} from '../../firebase/firebase'
import { Switch, Route, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/ContextComp'


const Startpage = () => {

    const [newAlbum, setNewAlbum] = useState("")
    const [albums, setAlbums] = useState([])

    const { logout } = useAuth()

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

    const handleLogout = () => {
        logout()
    }


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
                <div className="albums">
                    
                        <Route exact path="/">
                            <Albums albums={albums}/>
                        </Route>
                        <Route path="/:album">
                            <Album />
                        </Route>
                                 
                    
                </div>
            </div>

        </div>
    )
}

export default Startpage
