import React from 'react'
import './styles/startpage.scss'

const Hero = ({handleLogout}) => {
    return (
        <div className="hero">
            <nav>
                <h2>Welcome</h2>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            
        </div>
    )
}

export default Hero
