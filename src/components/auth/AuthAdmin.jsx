import React from 'react'
import {Navigate, Outlet} from "react-router-dom"

const AuthAdmin = () => {

    const token = localStorage.getItem('admin-token')

    return (
        token ? <Outlet />
            : <Navigate to="/admin/login" />
    )
}

export default AuthAdmin