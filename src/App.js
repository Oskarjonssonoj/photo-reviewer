import React from 'react';
import Login from './components/Login/Login.js';
import Signup from './components/Signup/Signup';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Home from './components/Home/Home';
import { BrowserRouter, Route } from 'react-router-dom'
import AuthContextProvider from './contexts/ContextComp'
import RestrictedRoute from './components/RestrictedRoute/RestrictedRoute'

const App = () => {

	return (
		<div className="App">
			<BrowserRouter>
				<AuthContextProvider>
					
					<Route exact path="/">
						<Login />
					</Route>

					<Route path="/register">
						<Signup />
					</Route>

					<Route path="/reset-password">
						<ForgotPassword />
					</Route>

					<RestrictedRoute path="/home/:page">
						<Home />
					</RestrictedRoute>

				</AuthContextProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
