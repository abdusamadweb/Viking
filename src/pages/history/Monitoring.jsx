import './History.scss'
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Segmented, Select} from "antd";
import Charts from "./Charts.jsx";

const Monitoring = () => {

    const navigate = useNavigate()

    const [nav, setNav] = useState(false)
    const [days, setDays] = useState(1)


    return (
        <div className="monitoring page">
            <div className="container">
                <div className="monitoring__head">
                    <div className="titles row align-center g1">
                        <button className='back' onClick={() => navigate(-1)}>
                            <i className="fa-solid fa-circle-chevron-left"/>
                        </button>
                        <span>Мониторинг</span>
                    </div>
                    <Segmented
                        options={['Пополнение', 'Снятие']}
                        onChange={() => setNav(!nav)}
                    />
                    <Select
                        className="select"
                        defaultValue='За последний 1 дней'
                        onChange={(e) => setDays(e.currentTarget.value)}
                        options={[
                            { value: '1', label: 'За последний 1 дней' },
                            { value: '7', label: 'За последний 7 дней' },
                            { value: '30', label: 'За последний 30 дней' },
                        ]}
                    />
                </div>
                <div className='monitoring__body'>
                    <Charts />
                    <div className="summary row between align-center">
                        <span className="txt">{ !nav ? 'Общее пополнение' : 'Общее снятие' }</span>
                        <span className="value">10 000 000 сум</span>
                    </div>
                    <ul className='list'>
                        <li className='list__item'>
                            <div className="row align-center g10">
                                <span className="percent">10%</span>
                                <span className="txt">Marafon</span>
                            </div>
                            <div className="value">5 000 000 сум</div>
                        </li>
                        <li className='list__item'>
                            <div className="row align-center g10">
                                <span className="percent">8%</span>
                                <span className="txt">Winline</span>
                            </div>
                            <div className="value">3 000 000 сум</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Monitoring;