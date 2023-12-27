import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import ImageUploader from './ImageUploader';
import { addMovie, getMovieDetails, updateMovie } from '../../../services/moviesServices/moviesServices';
import { objectToFormData } from '../../../utils/Utils';
import Header from '../../../components/Header';
import { toast } from 'react-toastify';

const AddEditMovie = () => {
    const { movieId } = useParams()
    const [isEdit, setEdit] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [isSubmitLoading, setSubmitLoading] = useState(false)
    const [isErr, setErr] = useState(false)
    const navigate = useNavigate()

    const loginSchema = Yup.object().shape({
        title: Yup.string().trim().required().label("Title"),
        uploadedImage: Yup.mixed().required().label("Image"),
        publishingYear: Yup.string().trim().required().test("", "Published Year is invalid", (value) => {
            const parsedValue = +value
            if (parsedValue <= new Date().getFullYear()) {
                return true
            } else {
                return false
            }
        }).label("Publishing Year"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        trigger,
        reset
    } = useForm({
        resolver: yupResolver(loginSchema)
    })

    useLayoutEffect(() => {
        if (movieId) {
            setLoading(true)
            setEdit(true)
            const fetchMovie = async () => {
                try {
                    const movieDetails = await getMovieDetails(movieId)
                    if (movieDetails._id) {
                        setValue("title", movieDetails.moviename)
                        setValue("uploadedImage", movieDetails.image)
                        setValue("publishingYear", movieDetails.publishyear)
                    }
                } catch (e) {
                    setErr(true)
                } finally {
                    setLoading(false)
                }
            }
            fetchMovie()
        }
    }, [movieId])

    const onSubmit = useCallback(async (data) => {
        setSubmitLoading(true)
        const formattedData = {
            moviename: data.title,
            ...(data?.uploadedImage?.name && { image: data.uploadedImage }),
            publishyear: +data.publishingYear
        }

        const payload = objectToFormData(formattedData)
        try {
            const res = await (isEdit ? updateMovie(movieId, payload) : addMovie(payload))
            const toastMsg = isEdit ? "Movie updated successfully!" : "Movie created successfully!"
            toast.success(toastMsg)
            if (!isEdit) {
                reset()
            }
            navigate("/")
        } catch (e) {
        } finally {
            setSubmitLoading(false)
        }
    }, [isEdit, movieId, reset])


    const onUploadImage = useCallback((uplodedFile) => {
        setValue("uploadedImage", uplodedFile)
        trigger('uploadedImage');
    }, [setValue, trigger])

    const onCancelClick = useCallback(() => {
        navigate(-1)
    }, [navigate])

    return (
        <div>
            {isLoading ? <Spinner animation="border" variant="primary" className='global-spinner' /> :
                <>
                    <Header
                        title={isEdit ? "Edit" : "Create a new movie"}
                    />
                    {isErr ? <div className='d-flex align-items-center flex-column justify-content-center'>
                        <h3 className='mb-5'>Movie is not available</h3>
                    </div> :
                        (<Form onSubmit={handleSubmit(onSubmit)}>
                            <Row className='gap-md-5 gap-4'>
                                <Col sm={12} md={5} className=''>
                                    <ImageUploader
                                        onUploadImage={onUploadImage}
                                        isInvalid={!!errors.uploadedImage}
                                        defaultImage={watch("uploadedImage")}
                                    />

                                    {errors?.uploadedImage && (
                                        <Form.Control.Feedback
                                            className='d-block'
                                            type="invalid">
                                            {errors?.uploadedImage?.message}
                                        </Form.Control.Feedback>
                                    )}
                                </Col>
                                <Col sm={12} md={6} >
                                    <Col sm={12} md={10} lg={8}>
                                        <Form.Group className="mb-4">
                                            <Form.Control
                                                type="text"
                                                placeholder="Title"
                                                isInvalid={!!errors.title}
                                                {...register("title")} />
                                            {errors?.title && (
                                                <Form.Control.Feedback
                                                    type="invalid">
                                                    {errors?.title?.message}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col sm={12} md={8} lg={6}>
                                        <Form.Group className="mb-4">
                                            <Form.Control
                                                type="text"
                                                placeholder="Published Year"
                                                isInvalid={!!errors.publishingYear}
                                                {...register("publishingYear")} />
                                            {errors?.publishingYear && (
                                                <Form.Control.Feedback
                                                    type="invalid">
                                                    {errors?.publishingYear?.message}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col sm={12} md={10} lg={8}>
                                        <Row className='mt-5 gap-3'>
                                            <Col>
                                                <Button
                                                    variant="outline-light"
                                                    disabled={isLoading}
                                                    className='w-100'
                                                    onClick={onCancelClick}
                                                >
                                                    Cancel
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Button
                                                    type='submit'
                                                    disabled={isLoading}
                                                    className='w-100'
                                                >
                                                    {isSubmitLoading && <Spinner size='sm' />}{" "}
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Col>
                            </Row>
                        </Form>)
                    }
                </>}
        </div >
    )
}

export default AddEditMovie
