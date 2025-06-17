import React, {useState} from 'react';
import './Header.scss'
import {Link, useHref} from "react-router-dom";
import {hiddenRoutes} from "../../assets/scripts/mockAPI.js";
import logo from '../../assets/images/logo.svg'
import logoLight from '../../assets/images/logo-light.png'
import logoOnly from '../../assets/images/logo-only.png'
import HeaderModal from "./modals/HeaderModal.jsx";
import LangDrawer from "./modals/LangDrawer.jsx";
import ThemeDrawer from "./modals/ThemeDrawer.jsx";
import {formatPrice, getDeviceType} from "../../assets/scripts/global.js";
import {useTheme} from "../../context/ThemeContext.jsx";
import PhoneModal from "./modals/PhoneModal.jsx";

const Header = ({ setEffect }) => {

    const { theme: themeL } = useTheme()
    const [theme, setTheme] = useState(1)

    const [modal, setModal] = useState('close')
    const [modal2, setModal2] = useState('close')

    const me = JSON.parse(localStorage.getItem('me'))

    const href = useHref({})
    const isHidden = hiddenRoutes.some(route => href.includes(route))

    const device = getDeviceType()


    return (
        <>
            {
                device !== 'Desktop' &&
                <div className={`header-top-v ${href.includes('admin') ? 'd-none' : ''}`}/>
            }
            {
                device !== 'Desktop' &&
                <div className={`header-top ${href.includes('admin') ? 'd-none' : ''}`}>
                    <div className="sticky">
                        <img src={logoOnly} alt="logo"/>
                    </div>
                </div>
            }
            <div className={`header ${isHidden ? 'd-none' : ''}`}>
                <div className="container">
                    <div className="header__inner row between align-center g10">
                        <Link className='logo' to='/'>
                            <img src={themeL === 'dark' ? logo : logoLight} alt="logo"/>
                        </Link>
                        <div className='d-flex align-center g1'>
                            {
                                href.includes('/history') &&
                                <Link className='monitoring-link' to="/history/monitoring">
                                    <i className="fa-solid fa-chart-pie"/>
                                </Link>
                            }
                            {
                                href === '/' &&
                                <div className='balance row align-center'>
                                    <i className="fa-solid fa-wallet"/>
                                    <span>{ me ? formatPrice(me?.amount) : 0 } uzs</span>
                                </div>
                            }
                            <button className='bar' onClick={() => setModal('menu')}>
                                <i className="fa-solid fa-bars"/>
                            </button>
                        </div>
                    </div>
                </div>

                <HeaderModal
                    theme={theme}
                    modal={modal}
                    setModal={setModal}
                    setModal2={setModal2}
                />

                <LangDrawer
                    modal={modal2}
                    setModal={setModal2}
                    setEffect={setEffect}
                />
                <ThemeDrawer
                    setTheme={setTheme}
                    modal={modal2}
                    setModal={setModal2}
                />

                <PhoneModal
                    modal={modal}
                    setModal={setModal}
                />
            </div>
        </>
    );
};

export default Header;