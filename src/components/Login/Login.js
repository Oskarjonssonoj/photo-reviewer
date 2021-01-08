import React from 'react'
import './styles/login.scss'

const Login = (props) => {

const { 
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignUp,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError
} = props;

    return (
        <div className="login">
            <div className="loginContainer">
                <label>Username</label>
                <input 
                    type="text" 
                    autoFocus 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <p className="errorMsg">{emailError}</p>  
                
                <label>Password</label>
                <input 
                    type="password" 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <p className="errorMsg">{passwordError}</p>  
            </div>
            
        </div>
    )
}

export default Login
