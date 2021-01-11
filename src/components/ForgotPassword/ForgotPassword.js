import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/ContextComp'
import './styles/login.scss'

const ForgotPassword = () => {

    const { resetPassword } = useAuth()

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [email, setEmail] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError(null);

        try {
            setLoading(true)
            await resetPassword(email)
            setSuccess(true)
        } catch (e) {
            setError("Something went wrong, please check your email adress")
            setLoading(false)
        }

    }

    return (
        <div className="login">
            <div className="loginContainer">
                <p className="errorMsg">{error}</p> 
                { 
                    !success && 

                    <form onSubmit={handleSubmit}>
                        <label>Email Adress</label>
                        <input 
                            type="text" 
                            autoFocus 
                            required 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        /> 
                        
                        <div className="btnContainer">
                            <button disabled={loading}>Send</button>
                            <p>Back to <Link to="/">Log In</Link></p>
                        </div>
                    </form>

                }

                { 
                    success &&

                    <div>
                        <div variant="success">
                            <p>Please check your email for further instructions</p>
                        </div>

                        <Link to="/" className="text-center mt-2">Log In</Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default ForgotPassword
