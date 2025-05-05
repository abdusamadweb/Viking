import React from 'react';
import './NavBar.scss'
import {NavLink, useHref} from "react-router-dom";
import {hiddenRoutesNav} from "../../assets/scripts/mockAPI.js";
import nav1 from '../../assets/images/nav1.svg'
import nav2 from '../../assets/images/nav2.svg'
import nav3 from '../../assets/images/nav3.svg'
import nav4 from '../../assets/images/nav4.svg'

const NavBar = () => {

    const href = useHref({})
    const isHidden = hiddenRoutesNav.some(route => href.includes(route))


    return (
        <nav className={`nav-bar ${isHidden ? 'd-none' : ''}`}>
            <ul className="nav-bar__list">
                <li className="item">
                    <NavLink className='item__link' to='/'>
                        <img src={nav1} alt="logo"/>
                        <span className="txt">Asosiy</span>
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink className='item__link' to='/search'>
                        <img src={nav2} alt="logo"/>
                        <span className="txt">Qidirish</span>
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink className='item__link' to='/applications'>
                        <img src={nav3} alt="logo"/>
                        <span className="txt">Arizalar</span>
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink className='item__link' to='/profile'>
                        <img src={nav4} alt="logo"/>
                        <span className="txt">Profil</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;