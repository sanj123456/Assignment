import { constants } from "../../constant/constants"
import { loginUser, logoutUser } from "../../redux/reducers/authSlice"
import { postRequest, removeFromLocalStorage, setAccessToken } from "../helper"

import store from "../../redux/store"
export const handleRegister = async (payload) => {
    try {
        const res = await postRequest(constants.endPoints.register, payload)
    } catch (e) {
        throw e
    }
}

export const handleLogin = async (payload) => {
    try {
        const res = await postRequest(constants.endPoints.login, payload)
        setAccessToken(res.data.token)
        return res.data
    } catch (e) {
        throw e
    }
}

export const handleLogout = async () => {
    try {
        removeFromLocalStorage(constants.accessToken)
        store.dispatch(logoutUser())
    } catch (e) {
        throw e
    }
}
