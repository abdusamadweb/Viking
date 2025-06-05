import React from 'react';
import {NavLink} from "react-router-dom";

const AdminNavBar = ({ openMenu, setOpenMenu }) => {

    const me = JSON.parse(localStorage.getItem('meAdmin'))

    const nav = [
        {
            name: 'Статистика',
            link: '/admin/dashboard'
        },
        {
            name: 'Юзеры',
            link: '/admin/users'
        },
        {
            name: 'Карты',
            link: '/admin/cards'
        },
        {
            name: 'Транзакции',
            link: '/admin/transactions'
        },
        {
            name: 'Провайдеры',
            link: '/admin/providers'
        },
        {
            name: 'Слайдер',
            link: '/admin/slider'
        },
    ]

    const navManager = [
        {
            name: 'Foydalanuvchilar',
            link: '/admin/users'
        },
        {
            name: 'Arizalar',
            link: '/admin/feeds'
        },
    ]

    const links =
        me?.role === 'admin' ? nav :
            me?.role === 'manager' ? navManager :
                [{
                    name: 'Statistika',
                    link: '/'
                }]


    return (
        <nav className={`nav ${openMenu ? 'open' : ''}`}>
            <ul className="nav__list">
                {
                    nav.map((item, i) => (
                        <li className="nav__item" onClick={() => setOpenMenu(false)} key={i}>
                            <NavLink className='nav__link row between align-center' to={item.link}>
                                <span>{ item.name }</span>
                                <i className="fa-solid fa-chevron-right icon"/>
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
};

export default AdminNavBar;