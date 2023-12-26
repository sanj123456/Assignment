import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useState } from 'react';
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as Yup from "yup";
import { handleRegister } from '../../services/authServices/authServices';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")

    const registerSchema = Yup.object().shape({
        email: Yup.string().trim().email().required().label("Email"),
        password: Yup.string().trim().required().min(6).max(9).label("Password"),
        confirmPassword: Yup.string().required()
            .oneOf([Yup.ref('password'), null], 'Passwords must match').label("Confirm Password")
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema)
    })

    const onSignInClick = useCallback(() => {
        navigate("/login")
    }, [navigate])


    const onSubmit = useCallback(async (data) => {
        setLoading(true)
        setErrMsg("")
        const payload = {
            email: data.email,
            password: data.password
        }
        try {
            await handleRegister(payload)
            toast.success("User created successfully!")
            onSignInClick()
        } catch (e) {
            setErrMsg(e?.error)
        } finally {
            setLoading(false)
        }
    }, [onSignInClick])



    return (
        <div>
            <Row className='d-flex justify-content-center align-items-center vh-100'>
                <Col sm={10} md={8} lg={4}>
                    <div className='text-center'>
                        <h1 className='mb-5'>
                            Sign up
                        </h1>
                    </div>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        {!!errMsg && <Alert variant={"danger"}>
                            {errMsg}
                        </Alert>}
                        <Form.Group className="mb-4">
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                isInvalid={!!errors.email}
                                {...register("email")} />
                            {errors?.email && (
                                <Form.Control.Feedback
                                    type="invalid">
                                    {errors?.email?.message}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Control
                                type="text"
                                placeholder="Password"
                                isInvalid={!!errors.password}
                                {...register("password")} />
                            {errors?.password && (
                                <Form.Control.Feedback
                                    type="invalid">
                                    {errors?.password?.message}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Control
                                type="text"
                                placeholder="Confirm Password"
                                isInvalid={!!errors.confirmPassword}
                                {...register("confirmPassword")} />
                            {errors?.confirmPassword && (
                                <Form.Control.Feedback
                                    type="invalid">
                                    {errors?.confirmPassword?.message}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                        <Button
                            type='submit'
                            className='w-100'
                            disabled={isLoading}>
                            {isLoading && <Spinner size='sm' />}{" "}Register
                        </Button>
                    </Form>
                    <div className='mt-4 d-flex flex-column align-items-center gap-1'>
                        <span>Already have account?</span>
                        <span className="cursor-pointer" onClick={onSignInClick}><b><u>Sign in</u></b></span>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Register