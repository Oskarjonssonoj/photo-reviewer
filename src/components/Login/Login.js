import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/ContextComp'
import './styles/login.scss'
import Photo from '../../assets/images/welcome.svg'

const Login = (props) => {

    // States
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Hooks
    const navigate = useNavigate()
    const { login } = useAuth()

    // GENERAL FUNCTIONS

    // Handle the submitting of login
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

        <div className="welcomeSection">
            <img alt="welcome" src={Photo}/>
        </div>
            <div className="loginContainer"> 
                <form onSubmit={handleSubmit}>
                    
                    <h1>Log In</h1>
                    
                    <p className="errorMsg">{error}</p>
                    <div className="inputFields">
                        <input 
                                type="text" 
                                autoFocus 
                                required 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="Email..."
                            /> 
                            
                            <input 
                                type="password" 
                                required 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Password..."
                            /> 
                    </div>
                    
                    <div className="btnContainer">
                        <div className="btns">
                            <button disabled={loading} id="signIn">Log in</button>
                            <Link to="/register"><button disabled={loading}>Register</button></Link>
                        </div>
                        <p>Forgot your password? Click <Link to="/reset-password">Here</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
