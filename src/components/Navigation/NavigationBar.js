import React from 'react'
import { useAuth } from '../../contexts/ContextComp'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import { Box, Flex, Spacer, Heading, Button, MenuItem, MenuGroup, Menu, MenuButton, MenuList} from "@chakra-ui/react"
import './navbar.scss'

const NavigationBar = () => {

    // Context
    const { logout, currentUser } = useAuth()

   	// GENERAL FUNCTIONS

    // Handle the submitting of logout
    const handleLogout = () => {
        logout()
    }

    return (
		<div className="nav">
			<Flex>
				<Box m="15px">
					<Heading size="md">Chakra App</Heading>
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
			</Flex>
		</div>
    )
}

export default NavigationBar
