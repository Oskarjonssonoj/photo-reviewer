import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { SRLWrapper } from 'simple-react-lightbox'
import useSelectedImages from '../../hooks/useSelectedImages';

const AllCustomerImages = ({ images, owner, title }) => {
	const [selectedPhotos, setSelectedPhotos] = useState([])
	const [checkedImage, setCheckedImage] = useState({})
	const [imagesForUpload, setImagesForUpload] = useState(null)
	const [errorMessage, setErrorMessage] = useState(false)

	const { selectedError, selectedSuccess } = useSelectedImages(imagesForUpload, owner, title);
	const navigate = useNavigate()
	const { albumId } = useParams()

	console.log(albumId)

	useEffect(() => {
		if (selectedError) {
			setErrorMessage("An error occurred and the image could not be uploaded.")
		} else if (selectedSuccess) {
			// Prevent duplicate upload
			setImagesForUpload(null);
			navigate('/')
		} 
	}, [selectedError, selectedSuccess]);

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
							</a>
							<Card.Body>
								<Card.Text className="text-muted small">
									{image.name} ({Math.round(image.size/1024)} kb)
								</Card.Text>
								<input
										type="checkbox"
										name={image.url}
										checked={checkedImage[image.url]}
										onChange={handleCheckedImage}
									/>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
			<Row>
				<Col>
					{selectedPhotos && selectedPhotos.length > 0 &&		
						<Button 
							className="btn button__primary" 
							onClick={() => handleCreateNewAlbum(selectedPhotos)}
						>
							Submit Photos
						</Button>
					}
				</Col>				
			</Row>
		</SRLWrapper>
	)
}

export default AllCustomerImages
