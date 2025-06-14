import React from "react"
import {Navigate, Outlet} from "react-router-dom"

const Auth = () => {

    // const chatId =
    //     window.Telegram?.WebApp?.initDataUnsafe?.user?.id ||
    //     new URLSearchParams(window.location.search).get("chat_id") ||
    //     new URLSearchParams(window.location.search).get("id") || "{null}"

    const hash = window.location.hash

    const token = localStorage.getItem('token')

    return (
        token ? <Outlet />
            : <Navigate to={`/login${hash}`} />
    )
}

export default Auth
