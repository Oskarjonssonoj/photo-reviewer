import React from 'react'
import './styles/startpage.scss'
import { Link } from 'react-router-dom';


const Home = () => {

    return (
        <div className="startpage">
            <h1>PhotoReviewer - A Place To Upload and Review Photos</h1>

            <div>
                <p>Already have an account?<Link to="/login">Log In</Link></p>
                <p>Don't have an account?<Link to="/register">Sign up</Link></p>
            </div>
        </div>
    )
}

export default Home
