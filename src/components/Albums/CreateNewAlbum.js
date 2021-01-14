import React, { useState } from 'react'
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase/firebase'
import { useAuth } from '../../contexts/ContextComp'
import NavigationBar from '../Navigation/NavigationBar'
import './styles/createnew.scss'

const CreateNewAlbum = () => {

	// States
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const [title, setTitle] = useState("")

	// Hooks
	const navigate = useNavigate()

	// Contexts
	const { currentUser } = useAuth()

	// GENERAL FUNCTIONS

	// Dynamicly changes the title state
	const handleTitleChange = (e) => {
		setTitle(e.target.value)
	}

	// Submit and create new album
	const handleSubmit = async (e) => {
		e.preventDefault()

		if (title.length < 4) {
			return;
		}

		setError(false)
		setLoading(true)
		
		try {

			setLoading(true)

			await db.collection('albums').add({
				images: [],
				title,
				owner: currentUser.uid
			})

			setLoading(true)
			navigate(`/albums`)
			
		} catch (e) {
			setError(e.message)
			setLoading(false)
		}
	}

	return (
		<>
			<NavigationBar />
				<div className="createNewAlbum">

					{error && (<Alert variant="danger">{error}</Alert>)}

					<form onSubmit={handleSubmit}>

						<div id="title">
							<h2>Create a New Album</h2>
							<p>Album Title</p>
							<input type="title" onChange={handleTitleChange} value={title} required placeholder="Enter Album Name..."/>
							{title && title.length < 4 && (
								<p className="text-danger">Please enter a title at least 4 characters long.</p>
							)}
						</div>

						<button disabled={loading} type="submit">Create</button>
					</form>
				</div>
		</>	
	)
}

export default CreateNewAlbum
