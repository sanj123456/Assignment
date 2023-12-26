import { constants } from "../../constant/constants"
import { setMoviesData } from "../../redux/reducers/moviesSlice"
import store from "../../redux/store"
import { getRequest, patchRequest, postRequest } from "../helper"

export const handleRegister = async (payload) => {
    try {
        const res = await getRequest(constants.endPoints.register, payload)
    } catch (e) {
        throw e
    }
}

export const getAllMyMovies = async () => {
    const activePage = store.getState().movies.activePage
    try {
        const res = await getRequest(constants.endPoints.allMoviesList + `?page=${activePage}`)
        store.dispatch(setMoviesData({ moviesList: res.data.moviesdata, totalPages: res.data.Pagination.pageCount }))
    } catch (e) {
        throw e
    }
}

export const addMovie = async (payload) => {
    try {
        const res = await postRequest(constants.endPoints.createMovie, payload)
    } catch (e) {
        throw e
    }
}

export const updateMovie = async (movieId, payload) => {
    try {
        const res = await patchRequest(constants.endPoints.editMovie + `/${movieId}`, payload)
    } catch (e) {
        throw e
    }
}

export const getMovieDetails = async (movieId) => {
    try {
        const res = await getRequest(constants.endPoints.singleMovie + `/${movieId}`)
        return res.data
    } catch (e) {
        throw e
    }
}