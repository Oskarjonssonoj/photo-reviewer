import { useParams } from 'react-router-dom'
import PuffLoader from 'react-spinners/PuffLoader'
import useAlbum from '../../hooks/useAlbum'
import AllCustomerImages from './AllCustomerImages'

const ReviewAlbum = () => {
	const { albumId } = useParams()
	const { album, images, loading} = useAlbum(albumId)

	return (
		<>	
			{loading 
				? <div className="spinner-wrapper"><PuffLoader color="#117a8b"/></div>
				: album && 
					<>
						<h1>{album.title}</h1>
						<AllCustomerImages images={images} owner={album.owner} title={album.title} />
					</>
			}
		</>
	)
}

export default ReviewAlbum
