import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import './styles/customerAlbum.scss';

const LikedImages = ({likedImages, create, goBack, dislikedImages}) => {
    console.log(goBack)

    const selectImagesAgain = () => {
        goBack()
    }

    const createAlbum = () => {
        create(likedImages)
    }

    return (
        <>
            <div className="img-container">
            <div className="go-back">
                <button onClick={selectImagesAgain}>Go back</button>
            </div>
                <h2>Liked Pictures:</h2>
                <div className="like-img">
                    {
                            likedImages.map(image => (
                            <div className="img-div" key={image.id}>
                                <div className="mb-3">
                                        <Card.Img variant="top" src={image} />
                                </div>
                            </div>
                        ))}

                </div>

            <h2>Disliked Pictures:</h2>
            <div className="like-img">
                    {
                        dislikedImages.map(image => (
                            <div className="img-div" key={image.id}>
                                <div className="mb-3">
                                        <Card.Img variant="top" src={image} />
                                </div>
                            </div>
                        ))}

                </div>

                <Button onClick={createAlbum}>Submit selection</Button>
            </div>
        </>
    )
}

export default LikedImages
