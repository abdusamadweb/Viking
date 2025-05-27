// global styles
import './assets/styles/global.css'
import './App.scss'

import {Route, Routes, useLocation} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import {useLayoutEffect, useState} from "react"
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

const Wrapper = ({ children }) => {
    const location = useLocation()
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0)
    }, [location.pathname])
    return children
}

function App() {

    const [loading, setLoading] = useState(true)
    const path = window.location.pathname


    return (
    <div className={`App ${path.includes('login') ? 'pb0' : ''} ${path.includes('adnpmin') ? 'admin' : ''}`}>

        {loading && <Loader setLoading={setLoading} />}

        <Wrapper>

            <ConfigProvider theme={antdConfig()}>

                <Header />
                <NavBar />

                <Routes>

                    <Route path='/' element={<Home />} />
                    <Route path='/swap' element={<Swap />} />
                    <Route path='/history' element={<History />} />
                    <Route path='/history/monitoring' element={<Monitoring />} />

                    <Route path='/profile' element={<Profile />} />
                    <Route path='/cards' element={<Card />} />

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
