import React from 'react'
import firebase from 'firebase';
import { useAuth } from '../../contexts/ContextComp'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import Logo from '../../assets/images/logo.png'
import './navbar.scss'
import { Box, Flex, Spacer, Button, MenuItem, MenuGroup, 
	Menu, MenuButton, MenuList } from "@chakra-ui/react"

const NavigationBar = () => {
	// how is the user
	let user = firebase.auth().currentUser;
    // Context
	const { logout, currentUser } = useAuth()
   	// GENERAL FUNCTIONS

    // Handle the submitting of logout
    const handleLogout = () => {
        logout()
    }

    return (
		<>
			<nav>
				<div className="nav-bar">
					<Link to="/albums">
						<img src={Logo} />
					</Link>
					<div className="button">
					{
						currentUser ? (
							<>
								<Link className="links" to="/albums" m="5"><button>Album</button></Link>
								<Link className="links" to="/" onClick={handleLogout} ><button>Logout</button></Link>
								<div>
									<p>{user.email}</p>
								</div>
							</>
						) : (
							<button className="nav-link">
								<Link to="/">
									Login
								</Link>
							</button>
						)
					}
					</div>
				</div>
			</nav>
		</>
    )
}

export default NavigationBar




{/* <Flex>
				<Box m="15px">
					<img src={Logo} />
				</Box>
				<Spacer />
				<Box>
					{
						currentUser ? (
							<>
								<NavLink className="nav-links" to="/albums" m="5">Album</NavLink>
								<Menu>
									<MenuButton m="15px" as={Button} color="blue.800">
										Profile
									</MenuButton>
									<MenuList>
										<MenuGroup title="Profile">
										<MenuItem>My Account</MenuItem>
										<MenuItem to="/" onClick={handleLogout} >Logout </MenuItem>
										</MenuGroup>
									</MenuList>
								</Menu>
							</>
						) : (
							<Button className="nav-link">
								<Link to="/">
									Login
								</Link>
							</Button>
						)
					}
				</Box>
			</Flex> */}
