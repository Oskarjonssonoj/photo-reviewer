import React from 'react';
import Login from './components/Login/Login.js';
import Startpage from './components/Startpage/Startpage.js';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import RestrictedRoute from './components/RestrictedRoute/RestrictedRoute.js';
import AuthContextProvider from './contexts/ContextComp'

const App = () => {

	return (
		<div className="App">
			<BrowserRouter>

			<AuthContextProvider>
				<div>
					<Switch>

						<RestrictedRoute exact path="/">
							<Startpage />
						</RestrictedRoute>

						<Route path="/login">
							<Login />
						</Route>

					</Switch>
				</div>

				</AuthContextProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
