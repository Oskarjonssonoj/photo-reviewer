import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Photo from './images/mapPicture.png'
import './styles/albums.scss'
import { BsFillFolderFill } from "react-icons/bs";

const AlbumsGrid = ({ albums }) => {

	return (
		<div className="albumContainer">
			{albums.map(album => (
				<div key={album.id}>
						<Link className="card" to={`/albums/${album.id}`}>
							<div> 
								<BsFillFolderFill className="icon" />
								 {album.title}
							</div>
						</Link>
				</div>
			))}
		</div>
	)
}

export default AlbumsGrid



{/* <Card.Img variant="top" src={Photo} title={album.title} />
<Link to={`/albums/${album.id}`}>{album.title}</Link> */}