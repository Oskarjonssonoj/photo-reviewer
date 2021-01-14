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
import './styles/album.scss'
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
import NavigationBar from '../Navigation/NavigationBar'


const Album = () => {
	// States
	const [invite, setInvite] = useState(null)
	const [editAlbumTitle, setEditAlbumTitle] = useState(null)
	const [newTitle, setNewTitle] = useState(null)
	const [errorMsg, setErrorMsg] = useState(false)

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
					<div className="album">
						
					<NavigationBar />

					<div className="albumSection">
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

						<div className="backToAlbums">
							<Link to="/albums">
								<button>
									Go back to all your albums
								</button>
							</Link>
						</div>

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
									<h2>{album && album.title}</h2>
									<BsPen onClick={handleEditAlbumTitle} className="editor-icon" />
									<p>Edit Title</p>
								</div>
						}	
						
						<div className="imagesSection">

							<UploadImage albumId={albumId} />

							<AllImages images={album.images} />

						</div>
							
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
					</div>
				</div>
			}		
		</>
	)
}

export default Album
