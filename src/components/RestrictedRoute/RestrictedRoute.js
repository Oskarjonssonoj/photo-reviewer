import React from 'react'
import { Route } from 'react-router-dom';
import { useAuth } from '../../contexts/ContextComp'
import Login from '../Login/Login';

const RestrictedRoute = (props) => {
    const { currentUser } = useAuth()

    return (
        currentUser 
        ? (<Route {...props} />)
        : (
            <Route to="/login">
                <Login />
            </Route> 
        )
    )
}

export default RestrictedRoute
