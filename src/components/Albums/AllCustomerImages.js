import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Row, Card } from 'react-bootstrap'
import { SRLWrapper } from 'simple-react-lightbox'
import useSelectedImages from '../../hooks/useSelectedImages';
import LikedImages from './LikedImages'
import { HiThumbDown, HiThumbUp } from "react-icons/hi";
import './styles/customerAlbum.scss';

const AllCustomerImages = ({ images, owner, title }) => {

	// States
	const [like, setLike] = useState(false)
	const [dislike, setDislike] = useState(false)
	const [likedImages, setLikedImages] = useState([])
	const [dislikedImages, setDislikedImages] = useState([])
	const [newImageArray, setNewImageArray] = useState(null)
	const [errorText, setErrorText] = useState(false)
	const [reviewSelected, setReviewSelected] = useState(false)

	// Hooks
	const { selectedError, selectedSuccess } = useSelectedImages(newImageArray, owner, title);
	const navigate = useNavigate()

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
	const handleLikedCheckedImage = (e, imgUrl) => {
		e.target.style.color = "green"; 

		const removeLikeImages = likedImages.filter(name => name !== imgUrl)
		const removeDisLikeImages = dislikedImages.filter(name => name !== imgUrl)


		setDislikedImages(removeDisLikeImages)
		setLikedImages([...removeLikeImages, imgUrl]);
	}

	const handleDislikedCheckedImage = (e, imgUrl) => {
		e.target.style.color = "red"; 

		const removeLikeImages = likedImages.filter(name => name !== imgUrl)
		const removeDisLikeImages = dislikedImages.filter(name => name !== imgUrl)


		setLikedImages(removeLikeImages)
		setDislikedImages([...removeDisLikeImages, imgUrl])
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

	const handleReview = () => {
		setReviewSelected(!reviewSelected)
	}

	return (
		<SRLWrapper>
		<p>{errorText}</p>
		{
			!reviewSelected
			 ? (
				<>
					<div className="images">
						{
						images.map(image => (
							<div key={image.id}>
								<div className="imageCard">
									<img variant="top" src={image.url} title={image.name} />
										<Card.Body>
											<Card.Text className="small">
												{image.name} ({Math.round(image.size/1024)} kb)
											</Card.Text>
											<div className="rate-section">
												<div className="thumb-button " name={image.url}>
													<label onClick={(e) => handleLikedCheckedImage(e, image.url)}><HiThumbUp className="like" /></label>
												</div>
												<div className="thumb-button " name={image.url}>
													<label name={image.url} onClick={(e) => handleDislikedCheckedImage(e, image.url)}><HiThumbDown className="dislike" /></label>
												</div>
											</div>
											
											
										</Card.Body>
								</div>
						</div>
						))}
					</div>
					<div className="submit-photo">
						{images.length <= likedImages.length + dislikedImages.length  &&
									<button 
										className="button" 
										onClick={handleReview}
									>
										Review my selction of images
									</button>
								}

						</div>
				</>
			) : (
				<LikedImages
				likedImages={likedImages} create={creatAlbum} goBack={handleReview} dislikedImages={dislikedImages}/>
			)
		}
			
		</SRLWrapper>
	)
}

export default AllCustomerImages
