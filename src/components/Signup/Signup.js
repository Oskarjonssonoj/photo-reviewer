import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/ContextComp'
import './styles/login.scss'

const Signup = (props) => {

    // States
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    
    // Hooks
    const navigate = useNavigate()

    // Contexts
    const { signup } = useAuth()

    // GENERAL FUNCTIONS

    // Handle the submitting of signup/registration
    const handleSubmit = async (e) => {
        e.preventDefault()

        if(password !== confirmPassword) {
            return setError("The password does not match")
        }

        setError(null);

        try {
            setLoading(true)
            await signup(email, password)
            navigate('/albums')
        } catch (e) {
            setError(e.message)
            setLoading(false)
        }

    }

    return (
        <div className="login">
            <div className="loginContainer">
                <p className="errorMsg">{error}</p> 
                <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input 
                        type="text" 
                        autoFocus 
                        required 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    /> 
                    
                    <label>Password</label>
                    <input 
                        type="password" 
                        required 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />

                    <label>Confirm Password</label>
                    <input 
                        type="password" 
                        required 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                    /> 
                    <div className="btnContainer">
                        <button disabled={loading}>Sign up</button>
                        <p>Already have an account? <Link to="/login">Log In</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
