import React, {useState} from 'react';
import './Header.scss'
import {Link, useHref} from "react-router-dom";
import {hiddenRoutes} from "../../assets/scripts/mockAPI.js";
import logo from '../../assets/images/logo.svg'

const Header = () => {

    const [modal, setModal] = useState(false)

    const href = useHref({})
    const isHidden = hiddenRoutes.some(route => href.includes(route))


    return (
        <div className={`header ${isHidden ? 'd-none' : ''}`}>
            <div className="container">
                <div className="header__inner row between align-center g10">
                    <Link className='logo' to='/'>
                        <img src={logo} alt="logo"/>
                    </Link>
                    <div className='d-flex align-center g10'>
                        <button className='bar' onClick={() => setModal(true)}>
                            <i className="fa-solid fa-bars"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;