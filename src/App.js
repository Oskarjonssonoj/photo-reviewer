import React from 'react';

import SimpleReactLightbox from 'simple-react-lightbox'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from "@chakra-ui/react"

import Login from './components/Login/Login.js';
import Signup from './components/Signup/Signup';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Home from './components/Home/Home';
import Album from './components/Albums/Album';
import Albums from './components/Albums/Albums';
import CreateNewAlbum from './components/Albums/CreateNewAlbum.js';
import RestrictedRoute from './components/RestrictedRoute/RestrictedRoute'
import NavigationBar from './components/Navigation/NavigationBar.js';
import NotFound from './components/NotFound/NotFound.js';


import AuthContextProvider from './contexts/ContextComp'
import './assets/scss/app.scss'

const App = () => {

	return (
			<Router>
				<ChakraProvider>
					<AuthContextProvider>

					<SimpleReactLightbox>

						<NavigationBar />

							<Container className="py-3">
								<Routes>

									{/* Landing Pagge */}
									<Route path="/">
										<Home />
									</Route>

									{/* Registration, Login, Reset */}
									<Route path="/register">
										<Signup />
									</Route>

									<Route path="/login">
										<Login />
									</Route>

									<Route path="/reset-password">
										<ForgotPassword />
									</Route>

									{/* Restricted/Authenticated Components */}
									<RestrictedRoute path="/albums">
										<RestrictedRoute path="/">
											<Albums />
										</RestrictedRoute>

										<RestrictedRoute path="/create">
											<CreateNewAlbum />
										</RestrictedRoute>

										<RestrictedRoute path="/:albumId">
											<Album />
										</RestrictedRoute>
									</RestrictedRoute>

									{/* If Route not found */}
									<Route path="*" element={<NotFound />} />

								</Routes>
							</Container>
						
						</SimpleReactLightbox>

					</AuthContextProvider>
				</ChakraProvider>
			</Router>
	);
}

export default App;
