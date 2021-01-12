import React from 'react'
import { useAuth } from '../../contexts/ContextComp'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'

const NavigationBar = () => {

    // Context
    const { logout, currentUser } = useAuth()

    // General Functions
    const handleLogout = () => {
        logout()
    }

    return (
        <div>
			<Navbar>
				<Container>
					<Link to="/" className="navbar-brand">
						PhotoReviewer
					</Link>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							{
								currentUser ? (
                                    <NavLink to="/login" onClick={handleLogout} className="dropdown-item">Log Out</NavLink>
								) : (
									<NavLink to="/login" className="nav-link">Login</NavLink>
								)
							}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
    )
}

export default NavigationBar
