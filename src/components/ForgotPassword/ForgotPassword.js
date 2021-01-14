import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/ContextComp'

const ForgotPassword = () => {

    // States
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [email, setEmail] = useState("")
    
    // Contexts
    const { resetPassword } = useAuth()

    // GENERAL FUNCTIONS

    // Handle the submitting of forgotten password
    const handleSubmit = async (e) => {
        e.preventDefault()

        setError(null);

        try {
            setLoading(true)
            await resetPassword(email)
            setSuccess(true)
        } catch (e) {
            setError("Something went wrong, please check if you typed in the right password")
            setLoading(false)
        }

    }

    return (
        <div className="login">
            <div className="loginContainer">
                <p className="errorMsg">{error}</p>
                <p>Please enter your email address and press send to recieve a link to restore your password</p> 
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
                            <p>Back to <Link to="/login">Log In</Link></p>
                        </div>
                    </form>

                }

                { 
                    success &&

                    <div>
                        <div variant="success">
                            <p>Please check your email for further instructions</p>
                        </div>

                        <Link to="/login" className="text-center mt-2">Log In</Link>
                    </div> 
                }
            </div>
        </div>
    )
}

export default ForgotPassword
