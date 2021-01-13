import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { BounceLoader } from 'react-spinners'
import { Button } from 'react-bootstrap'
import AllImages from './AllImages'
import useAlbum from '../../hooks/useAlbum'
import UploadImage from './UploadImage'
import { useAuth } from '../../contexts/ContextComp'

const Album = () => {

	const [invite, setInvite] = useState(null)

	const { albumId } = useParams()
	const { album, images, loading } = useAlbum(albumId)
	const { currentUser } = useAuth()

	const handleInvite = () => {
		const href = window.location.href
        setInvite(`${href}/review`);
    };

	return (
		<>
			{
				loading

				? <BounceLoader color={"#888"} size={20} />
				: album && currentUser &&
					<>
						<h2 className="mb-3">{album && album.title}</h2>
						

						<Link to="/albums">Go back to all your albums</Link>
						
						{
							invite && 
							<p>{invite}</p>
						}

						<UploadImage albumId={albumId} />

						<hr />
						<AllImages images={album.images} />

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
					</>
			}		
		</>
	)
}

export default Album
