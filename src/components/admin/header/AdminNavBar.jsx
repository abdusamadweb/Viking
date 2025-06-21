import React from 'react';
import {NavLink} from "react-router-dom";

const AdminNavBar = ({ openMenu, setOpenMenu }) => {

    const me = JSON.parse(localStorage.getItem('me-admin'))
    const nav = me?.modules || []
    console.log(me)


    return (
        <nav className={`nav ${openMenu ? 'open' : ''}`}>
            <ul className="nav__list">
                {
                    nav.map((i, index) => (
                        <li className="nav__item" onClick={() => setOpenMenu(false)} key={index}>
                            {
                                i?.submodules?.length ?
                                    <ul className='sublist'>
                                        <li className='nav__link txt'>
                                            <span>{ i.name }</span>
                                            <i className="fa-solid fa-chevron-down icon"/>
                                        </li>
                                        {
                                            i?.submodules?.map((j, jndex) => (
                                                <li className='sublist__item' key={jndex}>
                                                    <NavLink className='nav__link' to={'/admin/' + j.route}>
                                                        <span>{ j.name }</span>
                                                        <i className="fa-solid fa-chevron-right icon"/>
                                                    </NavLink>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    :
                                    <NavLink className='nav__link' to={'/admin/' + i.route}>
                                        <span>{ i.name }</span>
                                        <i className="fa-solid fa-chevron-right icon"/>
                                    </NavLink>
                            }
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
};

export default AdminNavBar;