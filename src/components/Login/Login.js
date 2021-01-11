import React, { useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/ContextComp'
import './styles/login.scss'

const Login = (props) => {

    const history = useHistory()
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
            history('/')
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
                        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
