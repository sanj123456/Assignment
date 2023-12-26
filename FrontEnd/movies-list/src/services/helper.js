import axiosInstance from "../axios/axiosInstance"
import { constants } from "../constant/constants"

export const getRequest = async (endPoint) => {
    try {
        const res = await axiosInstance.get(endPoint)
        return res
    } catch (e) {
        throw e?.data
    }
}

export const postRequest = async (endPoint, payload) => {
    try {
        const res = await axiosInstance.post(endPoint, payload)
        return res
    } catch (e) {
        throw e?.data
    }
}

export const patchRequest = async (endPoint, payload) => {
    try {
        const res = await axiosInstance.patch(endPoint, payload)
        return res
    } catch (e) {
        throw e?.data
    }
}

export const deleteRequest = async (endPoint) => {
    try {
        const res = await axiosInstance.deleteRequest(endPoint)
        return res
    } catch (e) {
        throw e?.data
    }
}

export const setAccessToken = (accessToken) => {
    localStorage.setItem(constants.accessToken, accessToken)
}
export const getAccessToken = () => {
    return localStorage.getItem(constants.accessToken)
}

export const isAlreadyLoggedIn = () => {
    const rememberMe = getFromLocalStorage(constants.rememberMe)
    return rememberMe ? localStorage.getItem(constants.accessToken) : false
}

export const setInLocalStorage = (keyName, data) => {
    localStorage.setItem(keyName, JSON.stringify(data))
}

export const getFromLocalStorage = (keyName) => {
    return JSON.parse(localStorage.getItem(keyName))
}

export const removeFromLocalStorage = (keyName) => {
    return localStorage.removeItem(keyName)
}

export const clearAllLocalStorage = () => {
    return localStorage.clear()
}