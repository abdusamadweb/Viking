import './History.scss'
import React, {useState} from 'react';
import logo from '../../assets/images/big-logo.svg'
import CheckDrawer from "./CheckDrawer.jsx";
import {Link} from "react-router-dom";

const History = () => {

    const [selItem, setSelItem] = useState(null)


    return (
        <div className="history page">
            <div className="container">
                <div className="history__head">
                    <div className="title row align-center g10">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_3_624)">
                                <path
                                    d="M9.99996 0C7.55388 0.00719092 5.19478 0.908156 3.36663 2.53333L2.25579 1.4225C2.13925 1.30599 1.99078 1.22665 1.82915 1.19451C1.66753 1.16237 1.5 1.17888 1.34775 1.24194C1.1955 1.30499 1.06536 1.41178 0.973792 1.54878C0.882222 1.68579 0.833329 1.84687 0.833294 2.01167V5.83333C0.833294 6.05435 0.921091 6.26631 1.07737 6.42259C1.23365 6.57887 1.44561 6.66667 1.66663 6.66667H5.48829C5.65309 6.66663 5.81417 6.61774 5.95118 6.52617C6.08818 6.4346 6.19497 6.30446 6.25803 6.15221C6.32108 5.99996 6.33759 5.83243 6.30545 5.67081C6.27331 5.50918 6.19397 5.36071 6.07746 5.24417L5.13163 4.29833C6.23538 3.35545 7.58904 2.75314 9.02838 2.56449C10.4677 2.37583 11.9309 2.60894 13.2403 3.23553C14.5498 3.86211 15.6493 4.85525 16.4054 6.09444C17.1615 7.33363 17.5417 8.76562 17.5 10.2167C17.4464 12.0916 16.6922 13.8783 15.3862 15.2246C14.0802 16.5708 12.3171 17.3788 10.4447 17.4893C8.57232 17.5998 6.72649 17.0046 5.27125 15.8213C3.816 14.6379 2.85698 12.9522 2.58329 11.0967C2.54421 10.795 2.39715 10.5176 2.16933 10.316C1.94151 10.1144 1.64835 10.0021 1.34413 10C1.1676 9.99772 0.992614 10.0331 0.830865 10.1039C0.669116 10.1746 0.524327 10.2791 0.406168 10.4103C0.288009 10.5414 0.199202 10.6963 0.145679 10.8645C0.0921558 11.0328 0.0751487 11.2105 0.0957938 11.3858C0.442636 13.8408 1.68778 16.0799 3.59029 17.6697C5.4928 19.2596 7.91742 20.0872 10.395 19.9925C12.9014 19.8717 15.273 18.8218 17.0474 17.0474C18.8218 15.2731 19.8717 12.9014 19.9925 10.395C20.0441 9.04993 19.824 7.70826 19.3452 6.45022C18.8665 5.19218 18.1389 4.04361 17.2061 3.0732C16.2732 2.10279 15.1543 1.33047 13.9161 0.802433C12.678 0.274392 11.346 0.00147357 9.99996 0Z"
                                    fill="#fff"/>
                                <path className="active"
                                      d="M9.58337 5.83331C9.25185 5.83331 8.93391 5.96501 8.69949 6.19943C8.46507 6.43385 8.33337 6.75179 8.33337 7.08331V10.6608C8.33347 11.1028 8.50913 11.5267 8.82171 11.8391L10.3159 13.3333C10.5516 13.561 10.8674 13.687 11.1951 13.6842C11.5229 13.6813 11.8364 13.5498 12.0681 13.3181C12.2999 13.0863 12.4314 12.7728 12.4342 12.4451C12.4371 12.1173 12.3111 11.8016 12.0834 11.5658L10.8334 10.3158V7.08331C10.8334 6.75179 10.7017 6.43385 10.4673 6.19943C10.2328 5.96501 9.91489 5.83331 9.58337 5.83331Z"
                                      fill="#0095FF"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_3_624">
                                    <rect width="20" height="20" fill="#fff"/>
                                </clipPath>
                            </defs>
                        </svg>
                        <span>История</span>
                    </div>
                    <div className="statistics grid">
                        <div className="statistics__item">
                            <div className="sub">Пополнено на</div>
                            <span className="count"><span className='green'>+</span> 10 000 000 сум</span>
                        </div>
                        <div className="statistics__item">
                            <div className="sub">Снято на</div>
                            <span className="count"><span className='red'>-</span> 10 000 000 сум</span>
                        </div>
                    </div>
                </div>
                <div className="history__body">
                    <div className="titles row between align-center">
                        <span className="month">Апрель</span>
                        <span className="count">+200 000 сум</span>
                    </div>
                    <ul className="list">
                        <li className="list__item" onClick={() => setSelItem([])}>
                            <div className='row align-center g10'>
                                <div className="imgs grid-center">
                                    <img src={logo} alt="img"/>
                                </div>
                                <div>
                                    <span className="txt">Снято с баланса</span>
                                    <span className='date'>24.04.2025, 11:08</span>
                                </div>
                            </div>
                            <div className="flexed">
                                <span className="count"><span className='green'>+</span> 100 000 сум</span>
                                <span className="status accept">Успешно</span>
                            </div>
                        </li>
                        <li className="list__item" onClick={() => setSelItem([])}>
                            <div className='row align-center g10'>
                                <div className="imgs grid-center">
                                    <img src={logo} alt="img"/>
                                </div>
                                <div>
                                    <span className="txt">Снято с баланса</span>
                                    <span className='date'>24.04.2025, 11:08</span>
                                </div>
                            </div>
                            <div className="flexed">
                                <span className="count"><span className='green'>+</span> 100 000 сум</span>
                                <span className="status reject">Отменено</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <CheckDrawer
                selItem={selItem}
                setSelItem={setSelItem}
            />
        </div>
    );
};

export default History;