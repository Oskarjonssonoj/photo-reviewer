import React from 'react'
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../../contexts/ContextComp'

const RestrictedRoute = (props) => {

    // Contexts
    const { currentUser } = useAuth()

    return (
        currentUser 
            ? <Route {...props} />
			: <Navigate to='/login' />
        
    )
}

export default RestrictedRoute
