import { useEffect, useState } from "react";
import AppHeader from "../app-header/app-header";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { fetchMarvel } from "../../redux/marvel-slice";
import { _baseOffset } from "../../services/marvel-service";
import MainPage from "../pages/main-page";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error-page";
import ComicsPage from "../pages/comics-page";


const router = createBrowserRouter([
    {
        path: "/",
        element: <div className="app"><main><AppHeader /></main> </div>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <MainPage />
            },
            {
                path: "comics",
                element: <ComicsPage />
            },
        ]
    },

]);

export const App = () => {
    const dispatch = useAppDispatch();

    useEffect(
        () => {
            dispatch(fetchMarvel(_baseOffset))
        }, [dispatch]);

    return (
        <RouterProvider router={router} />
    )
}
