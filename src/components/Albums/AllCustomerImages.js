import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { SRLWrapper } from 'simple-react-lightbox'
import useSelectedImages from '../../hooks/useSelectedImages';

const AllCustomerImages = ({ images, owner, title }) => {

	// States
	const [newImages, setNewImages] = useState([])
	const [checkedImage, setCheckedImage] = useState({})
	const [newImageArray, setNewImageArray] = useState(null)
	const [errorText, setErrorText] = useState(false)

	// Hooks
	const { selectedError, selectedSuccess } = useSelectedImages(newImageArray, owner, title);
	const navigate = useNavigate()
	const { albumId } = useParams()

	// Effects
	useEffect(() => {
		if (selectedError) {
			setErrorText("Unexpected error, could not upload and create new album.")
		} else if (selectedSuccess) {
			setNewImageArray(null);
			navigate('/')
		} 
	}, [selectedError, selectedSuccess]);

	// GENERAL FUNCTIONS -->

	// Handling all the checked boxed and storing in new array
	const handleCheckedImage = (e) => {
		
		setCheckedImage({...checkedImage, [e.target.name] : e.target.checked })
		
			if (newImages.includes(e.target.name)) {
				for (let i = 0; i < newImages.length; i++){     
					newImages[i] === e.target.name && newImages.splice(i, 1) 			
				}
			} else {
				newImages.push(e.target.name)
			}
		setNewImages(newImages);
	}

	// Create new album based on rated pictures
	const creatAlbum = (checkedImages) => {
		let imagesToSave = []

		images.forEach(imgItem => {
			if (checkedImages.includes(imgItem.url)) {
				imagesToSave.push(imgItem)
			}
		})

		setNewImageArray(imagesToSave)
	}

	return (
		<SRLWrapper>
		<p>{errorText}</p>
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
					{newImages && newImages.length > 0 &&		
						<Button 
							className="btn button__primary" 
							onClick={() => creatAlbum(newImages)}
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
