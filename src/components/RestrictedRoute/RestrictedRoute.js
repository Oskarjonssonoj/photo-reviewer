import React from 'react'
import { Route } from 'react-router-dom';
import { useAuth } from '../../contexts/ContextComp'

const RestrictedRoute = (props) => {
    const { currentUser } = useAuth()

    return (
        currentUser 
        ? (<Route {...props} />)
        : (<Route to="/login" /> )
    )
}

export default RestrictedRoute
