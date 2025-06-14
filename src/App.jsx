// global styles
import './assets/styles/global.css'
import './App.scss'

import {Route, Routes, useLocation} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import {useEffect, useLayoutEffect, useState} from "react"
import Loader from "./components/loader/Loader.jsx"
import AuthAdmin from "./components/auth/AuthAdmin.jsx";
import {antdConfig} from "./config/antd/antdConfig.js";
import {ConfigProvider} from "antd";
import Home from "./pages/home/Home.jsx";
import NavBar from "./components/nav-bar/NavBar.jsx";
import Header from "./components/header/Header.jsx";
import Swap from "./pages/swap/Swap.jsx";
import History from "./pages/history/History.jsx";
import Monitoring from "./pages/history/Monitoring.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Card from "./pages/card/Card.jsx";
import {useQuery} from "@tanstack/react-query";
import {$resp} from "./api/config.js";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import RegisterSms from "./pages/auth/RegisterSms.jsx";
import Page404 from "./pages/404/Page404.jsx";
import Admin from "./pages/admin/Admin.jsx";
import AdminLogin from "./pages/admin/login/AdminLogin.jsx";
import AdminHeader from "./components/admin/header/AdminHeader.jsx";
import {antdConfigAdmin} from "./config/antd/antdConfigAdmin.js";
import AdminCards from "./pages/admin/cards/AdminCards.jsx";
import AdminTrans from "./pages/admin/transactions/AdminTrans.jsx";
import AdminProviders from "./pages/admin/providers/AdminProviders.jsx";
import AdminSlider from "./pages/admin/slider/AdminSlider.jsx";
import AdminUsers from "./pages/admin/users/AdminUsers.jsx";
import i18n from "i18next";
import eruda from "eruda";
import {parseTelegramWebAppData} from "./telegram/api.js";
import Auth from "./components/auth/Auth.jsx";


const Wrapper = ({ children }) => {
    const location = useLocation()
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 5)
    }, [location.pathname])
    return children
}


// fetch
const fetchMe = async () => {
    const { data } = await $resp.post("/user/me")
    return data
}
const fetchCards = async () => {
    const { data } = await $resp.get(`/user-card/my-cards?page=1&limit=30`)
    return data
}

const fetchTrans = async () => {
    const { data } = await $resp.get(`/transaction/my-transactions?page=1&limit=50`)
    return data
}
const getWD = async () => {
    const { data } = await $resp.get("/statics/my-deposits-withdraws")
    return data
}
const fetchSlider = async () => {
    const { data } = await $resp.get("/slider/all")
    return data
}
const fetchProvider = async () => {
    const { data } = await $resp.get("/provider/f-all")
    return data
}





function App() {

    const [_____, setEffect] = useState(false)
    const [loading, setLoading] = useState(true)
    const path = window.location.pathname

    const token = localStorage.getItem("token")


    // chat id
    const tgData = parseTelegramWebAppData()
    console.log(tgData)


    // fetch
    const { data: me, refetch: refetchMe } = useQuery({
        queryKey: ['me'],
        queryFn: fetchMe,
        keepPreviousData: true,
        enabled: !!token
    })
    useEffect(() => {
        if (me) localStorage.setItem('me', JSON.stringify(me?.data))
    }, [me])

    const { data: cards } = useQuery({
        queryKey: ['cards'],
        queryFn: fetchCards,
        keepPreviousData: true,
        enabled: !!token
    })
    useEffect(() => {
        if (cards) localStorage.setItem('cards', JSON.stringify(cards?.data))
    }, [cards])

    const { data: _ } = useQuery({
        queryKey: ['history'],
        queryFn: fetchTrans,
        keepPreviousData: true,
        enabled: !!token
    })
    const { data: __ } = useQuery({
        queryKey: ['withdraw-deposit'],
        queryFn: getWD,
        keepPreviousData: true,
        enabled: !!token
    })
    const { data: ___ } = useQuery({
        queryKey: ['slider'],
        queryFn: fetchSlider,
        keepPreviousData: true,
        enabled: !!token
    })
    const { data: ____ } = useQuery({
        queryKey: ['provider'],
        queryFn: fetchProvider,
        keepPreviousData: true,
        enabled: !!token
    })


    useEffect(() => document.documentElement.scrollTo(0, 5), [])


    // i18 lang
    useEffect(() => {
        if (!localStorage.getItem('i18nextLng')) {
            const lang = navigator.language.slice(0, 2)
            const supported = ['en', 'ru', 'uz']

            if (supported.includes(lang)) {
                i18n.changeLanguage(lang)
            } else {
                i18n.changeLanguage('ru') // fallback
            }
        }
    }, [me])


    // eruda
    useEffect(() => {
        const script = document.createElement('script')
        script.src = '//cdn.jsdelivr.net/npm/eruda'
        script.onload = () => {
            eruda.init()
        }
        document.body.appendChild(script)
    }, [])


    return (
    <div className={`App ${path.includes('login') ? 'pb0' : ''} ${path.includes('admin') ? 'admin' : ''}`}>

        {loading && <Loader setLoading={setLoading} />}

        <Wrapper>

            <ConfigProvider theme={antdConfig()}>

                <Header refetchMe={refetchMe} setEffect={setEffect} />
                <NavBar />

                <Routes>

                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/register/sms' element={<RegisterSms />} />

                    <Route element={<Auth hash={tgData?.rawData} />}>

                        <Route path='/' element={<Home refetchMe={refetchMe} />} />
                        <Route path='/swap' element={<Swap refetchMe={refetchMe} />} />
                        <Route path='/history' element={<History />} />
                        <Route path='/history/monitoring' element={<Monitoring />} />

                        <Route path='/profile' element={<Profile refetchMe={refetchMe} />} />
                        <Route path='/cards' element={<Card />} />

                    </Route>

                    <Route path='/games' element={<Page404 />} />

                </Routes>

            </ConfigProvider>

            <ConfigProvider theme={antdConfigAdmin()}>

                <AdminHeader />

                <Routes>

                    <Route element={<AuthAdmin />}>

                        <Route path='/admin' element={<Admin />} />
                        <Route path='/admin/users' element={<AdminUsers />} />
                        <Route path='/admin/cards' element={<AdminCards />} />
                        <Route path='/admin/transactions' element={<AdminTrans />} />
                        <Route path='/admin/providers' element={<AdminProviders />} />
                        <Route path='/admin/slider' element={<AdminSlider />} />

                    </Route>

                    <Route path='/admin/login' element={<AdminLogin />} />

                </Routes>

            </ConfigProvider>

        </Wrapper>

        <Toaster
            containerClassName='toast'
            position="top-center"
            reverseOrder={true}
            toastOptions={{style: {
                    borderRadius: '30px',
                    color: 'var(--text-color)',
                    background: 'var(--modal-bg1)'
            }}}
        />
    </div>
  )
}

export default App
