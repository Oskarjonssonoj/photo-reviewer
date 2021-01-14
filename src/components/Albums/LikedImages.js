import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'

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
            <Row className="my-3">
            <Button onClick={selectImagesAgain}>Go back</Button>
            <h2>Liked Pictures:</h2>
                {
                    likedImages.map(image => (
                    <Col sm={6} md={4} lg={3} key={image.id}>
                        <Card className="mb-3">
                                <Card.Img variant="top" src={image} />
                        </Card>
                    </Col>
                ))}

                <hr/>

            <h2>Disliked Pictures:</h2>
                {
                    dislikedImages.map(image => (
                    <Col sm={6} md={4} lg={3} key={image.id}>
                        <Card className="mb-3">
                                <Card.Img variant="top" src={image} />
                        </Card>
                    </Col>
                ))}
                

                <Button onClick={createAlbum}>Submit selection</Button>
            </Row>
        </>
    )
}

export default LikedImages
