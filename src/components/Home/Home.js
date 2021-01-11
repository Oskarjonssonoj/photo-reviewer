import React, { useState, useEffect } from 'react'
import './styles/startpage.scss'
import Albums from '../Albums/Albums'
import Album from '../Albums/Album'
import { Switch, Route } from 'react-router-dom';
import NavigationBar from '../Navigation/NavigationBar'


const Home = () => {

    return (
        <div className="startpage">
            <NavigationBar />
            
            <div className="albumsSection">
                <div className="albums">
                <Switch>
                        <Route exact path="/home/albums">
                            <Albums />
                        </Route>
                        <Route exact path="/home/albums/:album">
                            <Album />
                        </Route>
                </Switch>
                    
                </div>
            </div>

        </div>
    )
}

export default Home
