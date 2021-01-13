import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { BounceLoader } from 'react-spinners'
import { Button } from 'react-bootstrap'
import AllImages from './AllImages'
import useAlbum from '../../hooks/useAlbum'
import UploadImage from './UploadImage'
import {db} from '../../firebase/firebase'


import {
	FormControl,
	FormLabel,
	Input,
	AlertTitle,
	AlertDescription,
	CloseButton,
	Alert,
	AlertIcon,


  } from "@chakra-ui/react"


const Album = () => {

	const [invite, setInvite] = useState(null)
	const [editAlbum, setEditAlbum] = useState(null)
	const [newTitle, setNewTitle] = useState(null)
	const [errorMsg, setErrorMsg] = useState(false)


	const { albumId } = useParams()
	const { album, images, loading } = useAlbum(albumId)

	const handleInvite = () => {
		const href = window.location.href
        setInvite(`${href}/review`);
	};

	const handleTitleChange = (e) => {
		setNewTitle(e.target.value)
	}

	const handleEditAlbum = () =>{
		setEditAlbum(true)
	}
	const saveEditAlbum = async (e) =>{
		console.log('new album title', newTitle)
		if(newTitle.length < 3 ) {
			console.log('to short')
			return(
				setErrorMsg(true)
			)
		}
		setErrorMsg(false)
		try {
			// Update album title in database
			await db.collection('albums').doc(album.id).update({
				title: newTitle,
			});
			
			window.location.reload()

		} catch (e) {
			console.log("Something went wrong and the title could not be updated. Please try again.")
		}
		setEditAlbum(false)
		

	}
	

	return (
		<>

			{
				errorMsg && ( 
					<Alert status="error">
						<AlertIcon />
						<AlertTitle mr={2}>Your new name is to short, try agin</AlertTitle>
						<AlertDescription>Your Chakra experience may be degraded.</AlertDescription>
						<CloseButton position="absolute" right="8px" top="8px" />
					</Alert>
				)
			}

			{
				editAlbum  
					? 
					<>
						<FormControl onChange={handleTitleChange} id="first-name">
							<FormLabel>New Album Name</FormLabel>
							<Input placeholder={album && album.title} />
						</FormControl>
						<Button onClick={saveEditAlbum}>Save</Button>
					</>
					
					: 
					<>
						<Button onClick={handleEditAlbum}>editera album</Button>
					</>
					
				
				
			}
			<h2 className="mb-3">{album && album.title}</h2>
			
			<Link to="/albums">Go back to all your albums</Link>

			<UploadImage albumId={albumId} />

			<hr />

			{loading
				? (<BounceLoader color={"#888"} size={20} />)
				: (<AllImages images={images} />)
			}

			{images.length > 0 &&
				<div className="button-wrapper">
					<Button 
						className="btn button__secondary"
						disabled={loading} 
						onClick={handleInvite}
						>Invite link
					</Button>											
				</div>
			}		

			{
				invite && 
				<p>{invite}</p>
			}			
		</>
	)
}

export default Album
