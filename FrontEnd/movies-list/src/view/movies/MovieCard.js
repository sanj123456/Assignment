import React from 'react'
import { Card, Col } from 'react-bootstrap'
import editIcon from "../../assets/images/icons/edit_icon.svg"

const MovieCard = (props) => {
    const { movieName, titleImage, publishedYear, onEditClick } = props
    return (
        <Col xs={12} sm={6} md={6} lg={3} className='py-3'>
            <Card className='p-2 bg-none movie-card'>
                <Card.Img variant="top" src={titleImage} />
                <Card.Body>
                    <div className='d-flex justify-content-between'>
                        <Card.Title className='text-truncate'>{movieName}</Card.Title>
                        <img onClick={onEditClick} src={editIcon} className='feather-edit-icon cursor-pointer' alt="edit" />
                    </div>
                    <Card.Text>{publishedYear}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default MovieCard