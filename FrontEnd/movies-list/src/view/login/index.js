import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useState } from 'react';
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from "yup";
import { loginUser } from '../../redux/reducers/authSlice';
import { handleLogin } from '../../services/authServices/authServices';
import { setInLocalStorage } from '../../services/helper';

const Login = () => {
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const dispatch = useDispatch()

    const loginSchema = Yup.object().shape({
        email: Yup.string().trim().email().required().label("Email"),
        password: Yup.string().trim().required().min(6).max(9).label("Password"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema)
    })


    const onSignUpClick = useCallback(() => {
        navigate("/register")
    }, [navigate])

    const onSubmit = useCallback(async (data) => {
        setLoading(true)
        setErrMsg("")
        const payload = {
            email: data.email,
            password: data.password
        }
        try {
            await handleLogin(payload)
            dispatch(loginUser())
            toast.success("Logged in successfully!")
            setInLocalStorage("rememberMe", data.rememberMe)

        } catch (e) {
            setErrMsg(e?.error)
        } finally {
            setLoading(false)
        }
    }, [onSignUpClick])


    return (
        <div>
            <Row className='d-flex justify-content-center align-items-center vh-100'>
                <Col sm={10} md={8} lg={4}>
                    <div className='text-center'>
                        <h1 className='mb-5'>
                            Sign in
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
                        <Form.Group className="mb-4 d-flex justify-content-center align-items-center">
                            <Form.Check
                                id="remember-me"
                                type="checkbox"
                                label="Remember me"
                                {...register("rememberMe")}
                            />
                        </Form.Group>
                        <Button
                            type='submit'
                            className='w-100'
                            disabled={isLoading}>
                            {isLoading && <Spinner size='sm' />}{" "}Login
                        </Button>
                    </Form>
                    <div className='mt-4 d-flex flex-column align-items-center gap-1'>
                        <span>Don't have account?</span>
                        <span className="cursor-pointer" onClick={onSignUpClick}><b><u>Sign up</u></b></span>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Login