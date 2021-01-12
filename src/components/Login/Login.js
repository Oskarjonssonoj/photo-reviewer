import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/ContextComp'
import './styles/login.scss'

const Login = (props) => {

    const navigate = useNavigate()
    const { login } = useAuth()

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError(null);

        try {
            setLoading(true)
            await login(email, password)
            navigate('/albums')
        } catch (e) {
            setError("Email or password are invalid")
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
                    <div className="btnContainer">
                        <button disabled={loading}>Sign in</button>
                        <p>Don't have an account? <Link to="/register">Sign up</Link></p>
                        <p>Forgot your password? Click <Link to="/reset-password">Here</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
