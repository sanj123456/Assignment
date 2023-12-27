import React, { useCallback, useEffect, useState } from 'react'
import { Button, Row, Spinner } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setActivePage } from '../../redux/reducers/moviesSlice'
import MovieCard from './MovieCard'
import addMovieIcon from "../../assets/images/icons/add_movie_icon.svg"
import Header from '../../components/Header'
import { getAllMyMovies } from '../../services/moviesServices/moviesServices'

const MoviesList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { myMoviesList, totalPages, activePage } = useSelector(state => state.movies)
    const [isLoading, setLoading] = useState(true)

    const fetchMoviesList = useCallback(async () => {
        setLoading(true)
        try {
            await getAllMyMovies()
            window.scrollTo(0, 0)
        } catch (e) { } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchMoviesList()
    }, [activePage])

    const onAddNewMovie = useCallback(() => {
        navigate("movies/add")
    }, [navigate])

    const onPageChange = useCallback(({ selected }) => {
        dispatch(setActivePage({ pageNum: selected + 1 }))
    }, [setActivePage])


    const onEditClick = useCallback((movieId) => {
        navigate("movies/edit/" + movieId)
    }, [navigate])

    const renderMoviesList = useCallback(() => {
        return myMoviesList?.map(movie => {
            return <MovieCard
                key={movie._id}
                movieName={movie.moviename}
                titleImage={movie.image}
                publishedYear={movie.publishyear}
                onEditClick={onEditClick.bind(null, movie._id)}
            />
        })
    }, [myMoviesList, onEditClick])


    const renderPagination = useCallback(() => {
        return <div className='py-5 my-5'>
            <ReactPaginate
                initialPage={activePage - 1}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                activeClassName={"active"}
                onPageChange={onPageChange}
                pageCount={totalPages}
                breakLabel="..."
                previousLabel={"Prev"}
                nextLabel={"Next"}
            />
        </div>
    }, [activePage, totalPages, onPageChange])


    return (
        <div className='mb-5'>
            <Header
                title="My Movies"
                subItem={<img
                    onClick={onAddNewMovie}
                    src={addMovieIcon}
                    className='cursor-pointer'
                    alt="AddMovie" />}
            />

            {isLoading
                ? <div className='vh-100 d-flex align-items-center flex-column justify-content-center'>
                    <Spinner animation="border" variant="primary" className='global-spinner' />
                </div>
                : myMoviesList?.length
                    ? <div>
                        <Row>
                            {renderMoviesList()}
                        </Row>
                    </div>
                    : <div className='vh-100 d-flex align-items-center flex-column justify-content-center'>
                        <h1 className='mb-5'>Your movie list is empty</h1>
                        <Button onClick={onAddNewMovie} className='px-4'>Add a new movie</Button>
                    </div>}
            {!!myMoviesList?.length && renderPagination()}
        </div>
    )
}

export default MoviesList
