import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { BounceLoader } from 'react-spinners'
import { Button } from 'react-bootstrap'
import AllImages from './AllImages'
import useAlbum from '../../hooks/useAlbum'
import UploadImage from './UploadImage'
import { useAuth } from '../../contexts/ContextComp'
import {db} from '../../firebase/firebase'
import { BsPen, BsX } from "react-icons/bs";
import './styles/albums.scss'
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
	// States
	const [invite, setInvite] = useState(null)
	const [editAlbumTitle, setEditAlbumTitle] = useState(null)
	const [newTitle, setNewTitle] = useState(null)
	const [errorMsg, setErrorMsg] = useState(false)
	const [editAndCreateAlbum, setEditAndCreateAlbum] = useState(false)

	// Hooks
	const { albumId } = useParams()
	const { album, loading } = useAlbum(albumId)
	
	// Contexts
	const { currentUser } = useAuth()


	// GENERAL FUNCTIONS -->

	// Invite a customer based on url + albumID
	const handleInvite = () => {

		// Gererating random code every time
		const generate_idCode = (length) => {
			//edit the token allowed characters
			var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
			var b = [];  
			for (var i=0; i<length; i++) {
				var j = (Math.random() * (a.length-1)).toFixed(0);
				b[i] = a[j];
			}
			return b.join("");
		}

		const href = window.location.href
        setInvite(`${href}/${generate_idCode(15)}`);
	};

	// Dynamicly change the title of album
	const handleTitleChange = (e) => {
		setNewTitle(e.target.value)
	}

	const handleEditAlbumTitle = () =>{
		setEditAlbumTitle(true)
	}

	const cancelEditor = () =>{
		setEditAlbumTitle(false)
	}

	const saveEditAlbumTitle = async (e) =>{
		console.log('new album title', newTitle)
		if(newTitle.length < 3 ) {
			console.log('to short')
			return(
				setErrorMsg(true)
			)
		}
		setErrorMsg(false)
		try {
			await db.collection('albums').doc(album.id).update({
				title: newTitle,
			});

		} catch (e) {
			console.log("Something went wrong and the title could not be updated. Please try again.")
		}
		setEditAlbumTitle(false)
	}
	

	return (
		<>

			{
				loading

				? <BounceLoader color={"#888"} size={20} />
				: album && currentUser &&
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
							editAlbumTitle  
								? 
								<>
									<FormControl onChange={handleTitleChange} id="first-name">
										<div className="album-title">
											<FormLabel>New Album Name</FormLabel>
											<BsX onClick={cancelEditor} className="editor-icon" />
										</div>
										<Input placeholder={album && album.title} />
									</FormControl>
									<Button onClick={saveEditAlbumTitle}>Save</Button>
								</>
								
								: 
								
								<div className="album-title">
									<h2 className="mb-3">{album && album.title}</h2>
									<BsPen onClick={handleEditAlbumTitle} className="editor-icon" />
								</div>
						}	
						
						<Link to="/albums">Go back to all your albums</Link>
						

						<UploadImage albumId={albumId} />

						<hr />

						<input
							className="mt-4"
							type="checkbox"
							onClick={()=> setEditAndCreateAlbum(!editAndCreateAlbum)}
						/>

						<AllImages images={album.images} edit={editAndCreateAlbum} />

						{album.images.length > 0 &&
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
			}		
		</>
	)
}

export default Album
