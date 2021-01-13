import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { BounceLoader } from 'react-spinners'
import { Button } from 'react-bootstrap'
import AllImages from './AllImages'
import useAlbum from '../../hooks/useAlbum'
import UploadImage from './UploadImage'

const Album = () => {

	const [invite, setInvite] = useState(null)

	const { albumId } = useParams()
	const { album, images, loading } = useAlbum(albumId)

	const handleInvite = () => {
		const href = window.location.href
        setInvite(`${href}/review`);
    };

	return (
		<>
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
