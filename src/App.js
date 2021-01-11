import React, { useState, useEffect } from 'react';
import firebase from './firebase/firebase.js'
import Login from './components/Login/Login.js';
import Startpage from './components/Startpage/Startpage.js';
import { Switch, Route, useHistory } from 'react-router-dom'

const App = () => {

	const [user, setUser] = useState('');
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [hasAccount, setHasAccount] = useState(true);

	const history = useHistory();

	const clearInputs = () => {
		setEmail('')
		setPassword('')
	}

	const clearErrors = () => {
		setEmailError('')
		setPasswordError('')
	}

	const handleLogin = () => {
		clearErrors();
		firebase.auth()
			.signInWithEmailAndPassword(email, password)
			.catch(err => {
				switch(err.code){
					case 'auth/invalid-email':
					case 'auth/user-disable':
					case 'user-not-found':
						setEmailError(err.message)
					break;

					case 'auth/wrong-password':
						setPasswordError(err.message)
					break;
				}
			})
	}

	const handleSignUp = () => {
		clearErrors();
		firebase.auth()
			.createUserWithEmailAndPassword(email, password)
			.catch(err => {
				switch(err.code){
					case 'auth/email-already-in-use':
					case 'auth/invalid-email':
						setEmailError(err.message)
					break;

					case 'auth/weak-password':
						setPasswordError(err.message)
					break;
				}
			})
	}

	const handleLogout = () => {
		firebase.auth().signOut().then(res => {
			history.push('/')
		});
	}

	const authListener = () => {
		firebase.auth().onAuthStateChanged(user => {
			if(user){
				clearInputs()
				setUser(user)
			} else {
				setUser('')
			}
		})
	}

	useEffect(() => {
		authListener();
	}, [])

	return (
		<div className="App">
		{
			user ? (
					<Startpage handleLogout={handleLogout}/>
			) : (
					<Login 
					email={email} 
					setEmail={setEmail} 
					password={password} 
					setPassword={setPassword}
					handleLogin={handleLogin}	
					handleSignUp={handleSignUp}
					hasAccount={hasAccount}
					setHasAccount={setHasAccount}
					emailError={emailError}
					passwordError={passwordError}
					/>
			)
		}
		</div>
	);
}

export default App;
