
import { lazy } from "react";

const HomePage = lazy(() => import("../../view/home"))
const LoginPage = lazy(() => import("../../view/login"))
const RegisterPage = lazy(() => import("../../view/register"))
const AddEditMoviePage = lazy(() => import("../../view/movies/add-edit/AddEditMovie"))

export const routes = [
    {
        path: "/",
        element: <HomePage />,
        private: true
    },
    {
        path: "/home",
        element: <HomePage />,
        private: true
    },
    {
        path: "/login",
        element: <LoginPage />,
        authPage: true,
    },
    {
        path: "/register",
        element: <RegisterPage />,
        authPage: true,
    },
    {
        path: "/movies/add",
        element: <AddEditMoviePage />,
        private: true
    },
    {
        path: "/movies/edit/:movieId",
        element: <AddEditMoviePage />,
        private: true
    },

];
