import React from "react"
import {Navigate, Outlet} from "react-router-dom"

const Auth = () => {

    // const chatId =
    //     window.Telegram?.WebApp?.initDataUnsafe?.user?.id ||
    //     new URLSearchParams(window.location.search).get("chat_id") ||
    //     new URLSearchParams(window.location.search).get("id") || "{null}"


    const isTelegram = window.location.hash.includes('tgWebAppData')
    const isAuthorized = !!localStorage.getItem('token')

    if (isTelegram || isAuthorized) {
        return <Outlet />
    } else {
        return <Navigate to='/login' />
    }
}

export default Auth
