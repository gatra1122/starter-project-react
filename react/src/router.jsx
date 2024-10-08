import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Masuk from "./views/Masuk.jsx";
import Daftar from "./views/Daftar.jsx";
import Dashboard from "./views/Dashboard.jsx";
import NotFound from "./views/NotFound.jsx";
import DataContoh from "./views/DataContoh.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard"></Navigate>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/datacontoh',
                element: <DataContoh/>
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/masuk',
                element: <Masuk/>
            },
            {
                path: '/daftar',
                element: <Daftar/>
            }
        ]
    },
    {
        path: '/*',
        element: <NotFound/>
    }
])

export default router;