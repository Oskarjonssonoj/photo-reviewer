import { useParams } from 'react-router-dom'
import { BounceLoader } from 'react-spinners'
import useAlbum from '../../hooks/useAlbum'
import AllCustomerImages from './AllCustomerImages'

const ReviewAlbum = () => {

	// Hooks
	const { albumId } = useParams()
	const { album, loading} = useAlbum(albumId)

	return (
		<>	
			{loading 
				? <div className="spinner-wrapper"><BounceLoader color="#117a8b"/></div>
				: album && 
					<>
						<h1>{album.title}</h1>
						<AllCustomerImages images={album.images} owner={album.owner} title={album.title} />
					</>
			}
		</>
	)
}

export default ReviewAlbum
