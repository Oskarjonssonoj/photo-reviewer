import React, { useState, useEffect } from 'react';
import firebase from './firebase/firebase.js'
import Login from './components/Login/Login.js';
import Startpage from './components/Startpage/Startpage.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RestrictedRoute from './components/RestrictedRoute/RestrictedRoute.js';
import AuthContextProvider from './contexts/ContextComp'

const App = () => {

	return (
		<div className="App">
			<BrowserRouter>

			<AuthContextProvider>
				<div>
					<Routes>

						<RestrictedRoute path="/">
							<Startpage />
						</RestrictedRoute>

						<Route path="/login">
							<Login />
						</Route>

					</Routes>
				</div>

				</AuthContextProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
