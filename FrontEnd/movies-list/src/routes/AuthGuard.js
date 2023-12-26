import { Fragment } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const AuthGuard = ({ routeElement, privatePage, authPage }) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

    if (!isLoggedIn && authPage) {
        return (
            <Fragment>
                {routeElement}
            </Fragment>
        )
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />
    }
    if (isLoggedIn && privatePage) {
        return (
            <div className="main-section">
                {routeElement}
            </div>
        )
    }
    if (isLoggedIn && authPage) {
        return <Navigate to="/" replace />
    }
    return (
        <div className="main-section">
            {routeElement}
        </div>
    )
}
export default AuthGuard