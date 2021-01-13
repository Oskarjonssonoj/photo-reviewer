import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { SRLWrapper } from 'simple-react-lightbox'
import { useAuth } from '../../contexts/ContextComp'
import useDeleteImage from '../../hooks/useDeleteImage'
import useUploadImage from '../../hooks/useUploadImage';

const ImagesGrid = ({ images, edit }) => {

	const [selectedPhotos, setSelectedPhotos] = useState([])
	const [checkedImage, setCheckedImage] = useState({})
	const [deleteImage, setDeleteImage] = useState(null);
	const [imagesForUpload, setImagesForUpload] = useState(null)
	const [errorMessage, setErrorMessage] = useState(false)
	
	const { error, isSuccess } = useUploadImage(imagesForUpload);
	const { currentUser } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (error) {
			setErrorMessage("An error occurred and the image could not be uploaded.")
		} else if (isSuccess) {
			// Prevent duplicate upload
			setImagesForUpload(null);
			navigate('/albums')
		} 
	}, [error, isSuccess]);
		
		
	const handleDeleteImage = (image) => {
		setDeleteImage(image);
	}

	useDeleteImage(deleteImage);

	const handleCheckedImage = (e) => {
		
		const imageNameUrl = e.target.name
		setCheckedImage({...checkedImage, [imageNameUrl] : e.target.checked })
		
		let newAlbum = selectedPhotos
			if (newAlbum.includes(imageNameUrl)) {
				for (let i = 0; i < newAlbum.length; i++){     
					newAlbum[i] === imageNameUrl && newAlbum.splice(i, 1) 			
				}
			} else {
				newAlbum.push(imageNameUrl)
			}
		setSelectedPhotos(newAlbum);
	}

	const handleCreateNewAlbum = (newImages) => {
		let imagesToSave = []
		let allImages = images

		allImages.forEach(imgItem => {
			if (newImages.includes(imgItem.url)) {
				imagesToSave.push(imgItem)
			}
		})

		setImagesForUpload(imagesToSave)
	}

	return (
		<SRLWrapper>
		<p>{errorMessage}</p>
			<Row className="my-3">
				{images.map(image => (
					<Col sm={6} md={4} lg={3} key={image.id}>
						<Card className="mb-3">
							<a href={image.url} title="View image in lightbox" data-attribute="SRL">
								<Card.Img variant="top" src={image.url} title={image.name} />
								{currentUser && 
									<input
										type="checkbox"
										name={image.url}
										checked={checkedImage[image.url]}
										onChange={handleCheckedImage}
									/>
								}
							</a>
							<Card.Body>
								<Card.Text className="text-muted small">
									{image.name} ({Math.round(image.size/1024)} kb)
								</Card.Text>
								{
									currentUser.uid === image.owner && (
										<Button variant="danger" size="sm" onClick={() => {
											handleDeleteImage(image)
										}}>
											Delete
										</Button>
									)
								}
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
			<Row>
				<Col>
					{currentUser && selectedPhotos && selectedPhotos.length > 0 &&		
						<Button 
							className="btn button__primary" 
							onClick={() => handleCreateNewAlbum(selectedPhotos)}
						>
							Create a new album
						</Button>
					}
				</Col>				
			</Row>
		</SRLWrapper>
	)
}

export default ImagesGrid
