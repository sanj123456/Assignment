import React, { useCallback } from 'react'
import { handleLogout } from '../services/authServices/authServices'
import logoutIcon from "../assets/images/icons/logout_icon.svg"
import goBack from "../assets/images/go-back.png"
import { useNavigate } from 'react-router-dom'

const Header = ({ title, subItem }) => {
    const navigate = useNavigate()
    const onLogoutClick = useCallback(() => {
        handleLogout()
    }, [])

    const onBackClick = useCallback(() => {
        navigate(-1)
    }, [navigate])

    return (
        <div className='d-flex justify-content-between align-items-center py-5 my-5'>
            <div className='d-flex justify-content-between align-items-center gap-2'>
                <img onClick={onBackClick} src={goBack} className='cursor-pointer' alt="back" />
                <h2 className='m-0'>{title}</h2>
                {subItem}
            </div>
            <div onClick={onLogoutClick} className='d-flex justify-content-between align-items-center fw-bold gap-2 cursor-pointer'>
                Logout
                <img  src={logoutIcon} className='' alt="logout" />
            </div>
        </div>
    )
}

export default Header
