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

const Wrapper = ({ children }) => {
    const location = useLocation()
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0)
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


function App() {

    const [loading, setLoading] = useState(true)
    const path = window.location.pathname


    // fetch
    const { data: me, refetch: refetchMe } = useQuery({
        queryKey: ['me'],
        queryFn: fetchMe,
        keepPreviousData: true,
        enabled: path === '/'
    })
    useEffect(() => {
        if (me) localStorage.setItem('me', JSON.stringify(me?.data))
    }, [me])

    const { data: cards } = useQuery({
        queryKey: ['cards'],
        queryFn: fetchCards,
        keepPreviousData: true,
        enabled: path === '/'
    })
    useEffect(() => {
        if (cards) localStorage.setItem('cards', JSON.stringify(cards?.data))
    }, [cards])

    const { data: _ } = useQuery({
        queryKey: ['history'],
        queryFn: () => fetchTrans(),
        keepPreviousData: true,
        enabled: path === '/'
    })


    return (
    <div className={`App ${path.includes('login') ? 'pb0' : ''} ${path.includes('admin') ? 'admin' : ''}`}>

        {loading && <Loader setLoading={setLoading} />}

        <Wrapper>

            <ConfigProvider theme={antdConfig()}>

                <Header />
                <NavBar />

                <Routes>

                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/register/sms' element={<RegisterSms />} />

                    <Route path='/' element={<Home refetchMe={refetchMe} />} />
                    <Route path='/swap' element={<Swap refetchMe={refetchMe} />} />
                    <Route path='/history' element={<History />} />
                    <Route path='/history/monitoring' element={<Monitoring />} />

                    <Route path='/profile' element={<Profile refetchMe={refetchMe} />} />
                    <Route path='/cards' element={<Card />} />

                    <Route path='/*' element={<Page404 />} />

                    <Route element={<AuthAdmin />}>
                        <Route path='/' element={<Home />} />
                    </Route>

                </Routes>

            </ConfigProvider>

        </Wrapper>

        <Toaster
            position="top-center"
            reverseOrder={true}
            toastOptions={{style: {borderRadius: '30px'}}}
        />
    </div>
  )
}

export default App
