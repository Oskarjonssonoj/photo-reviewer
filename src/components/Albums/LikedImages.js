import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'

const LikedImages = ({images, create, goBack}) => {
    console.log(goBack)

    const selectImagesAgain = () => {
        goBack()
    }

    const createAlbum = () => {
        create(images)
    }

    return (
        <>
            <Row className="my-3">
            <Button onClick={selectImagesAgain}>Go back</Button>
                {
                    images.map(image => (
                    <Col sm={6} md={4} lg={3} key={image.id}>
                        <Card className="mb-3">
                                <Card.Img variant="top" src={image} title={image.name} />
                        </Card>
                    </Col>
                ))}

                <Button onClick={createAlbum}>Submit selection</Button>
            </Row>
        </>
    )
}

export default LikedImages
