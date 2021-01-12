import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { BounceLoader } from 'react-spinners'
import AllImages from './AllImages'
import useAlbum from '../../hooks/useAlbum'
import UploadImage from './UploadImage'

const Album = () => {
	const { albumId } = useParams()
	const { album, images, loading } = useAlbum(albumId)

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
		</>
	)
}

export default Album
