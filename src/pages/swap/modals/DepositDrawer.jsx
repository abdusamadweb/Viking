import React, {useEffect, useState} from 'react';
import {Drawer} from "antd";
import logo from '../../../assets/images/big-logo.svg'
import timer from '../../../assets/images/timer.svg'

const DepositDrawer = ({ modal, setModal }) => {

    // timer
    const [active, setActive] = useState(false)
    const [timeLeft, setTimeLeft] = useState(120)

    useEffect(() => {
        if (!active) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    setActive(false)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [active])

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`
    }

    function startTimer() {
        setTimeLeft(120)
        setActive(true)
    }


    return (
        <Drawer
            rootClassName='main-modal main-drawer'
            className='deposit-drawer'
            placement='bottom'
            closable={false}
            onClose={() => setModal('close')}
            open={modal === 'drawer'}
            // open={true}
            key='bottom'
        >
            <span className='line'/>
            <p className="title">Переведите сумму на указанному карту ниже</p>
            <div className="card">
                <img className='card__img' src={logo} alt="img"/>
                <div className="card__number row align-center g10">
                    <span>9860 7816 2413 5860</span>
                    <i className="fa-solid fa-copy"/>
                </div>
                <span className="card__name">Rasulov Alijon</span>
                <div className="card__price row between">
                    <span className="txt">Сумма</span>
                    <span className="count">10 000 000 uzs</span>
                </div>
            </div>
            <div className="info">
                <div className="title row align-center g10">
                    <i className="fa-solid fa-circle-info"/>
                    <span>Примечание</span>
                </div>
                <p className="desc">Сумма нужно перевести точно, не меньше, не больше!</p>
            </div>
            <div className="timer center row align-center g10">
                <img src={timer} alt="icon"/>
                <span>{formatTime(timeLeft)}</span>
            </div>
        </Drawer>
    );
};

export default DepositDrawer;