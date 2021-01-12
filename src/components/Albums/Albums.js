import React from 'react'
import { Link } from 'react-router-dom'
import { BounceLoader } from 'react-spinners'
import { useAuth } from '../../contexts/ContextComp'
import useAlbums from '../../hooks/useAlbums'
import AllAlbums from './AllAlbums'

const Albums = () => {
	const { currentUser } = useAuth()
	const { albums, loading } = useAlbums()

	return (
		<>
			<h2 className="mb-3">All Albums</h2>

			{
				loading
					? (<BounceLoader color={"#888"} size={20} />)
					: (<AllAlbums albums={albums} />)
			}

			{
                currentUser && (
				<div className="mt-3">
					<Link to="/albums/create" className="btn btn-primary">Create a new Album</Link>
				</div>
			)
            }
		</>
	)
}

export default Albums