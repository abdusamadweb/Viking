import React, {useEffect, useState} from 'react';
import {Button, Drawer} from "antd";
import logo from '../../../assets/images/big-logo.svg'
import timer from '../../../assets/images/timer.svg'
import {formatCard, formatPrice} from "../../../assets/scripts/global.js";
import {toast} from "react-hot-toast";
import {useMutation} from "@tanstack/react-query";
import {$resp} from "../../../api/config.js";


// fetch
const completeDeposit = async (body) => {
    const { data } = await $resp.post("/transaction/deposit/complete", body)
    return data
}


const DepositDrawer = ({ modal, setModal, drawerCard, setActiveTimer, setSuccessText, refetchMe }) => {

    const [active, setActive] = useState(false)
    const [timeLeft, setTimeLeft] = useState(600)


    // mutate
    const mutation = useMutation({
        mutationFn: completeDeposit,
        onSuccess: (res) => {
            toast.success(res.message)
            refetchMe()

            setSuccessText(res.data.status)
            setActiveTimer(false)
            setModal('success')

            setActive(false)       // <-- to‘xtatish
            setTimeLeft(0)
        },
        onError: (err) => {
            toast.error(`Ошибка: ${err.response?.data?.message || err.message}`)
        }
    })

    const onFormSubmit = () => {
        const body = {
            trans_id: drawerCard.id,
            status: true
        }

        mutation.mutate(body)
    }
    const onFormReject = () => {
        const body = {
            trans_id: drawerCard.id,
            status: "false"
        }

        mutation.mutate(body)
    }


    // timer
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
        return `${minutes} : ${secs < 10 ? "0" : ""}${secs}`
    }

    function startTimer() {
        if (!active) {
            setTimeLeft(600)
            setActive(true)
        }
    }

    useEffect(() => {
        if (modal === 'drawer' && !active) {
            startTimer()
        }
    }, [modal])


    return (
        <Drawer
            rootClassName='main-modal main-drawer'
            className='deposit-drawer'
            placement='bottom'
            closable={false}
            onClose={() => setModal('close')}
            open={modal === 'drawer'}
            key='bottom'
            height={585}
            maskClosable={false}
        >
            <span className='line'/>
            <p className="title">Переведите сумму на указанному карту ниже</p>
            <div className="card">
                <img className='card__img' src={logo} alt="img"/>
                <button
                    className="card__number row align-center g10"
                    onClick={() => {
                        navigator.clipboard.writeText(drawerCard?.card_number)
                            .then(() => toast.success('Скопирован!'))
                            .catch(() => toast.error('Ошибка при копировании'));
                    }}
                >
                    <span>{ formatCard(drawerCard?.card_number) }</span>
                    <i className="fa-solid fa-copy"/>
                </button>
                <span className="card__name">{ drawerCard?.card_name || 'No Name' }</span>
                <div className="card__price row between">
                    <span className="txt">Сумма</span>
                    <span className="count">{ formatPrice(drawerCard?.amount || 0) } uzs</span>
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
            <div className="btns">
                <Button
                    className='btn submit'
                    htmlType='submit'
                    onClick={onFormSubmit}
                    loading={mutation.isPending}
                >
                    Я перевел указанную сумму
                </Button>
                <Button
                    className='btn'
                    onClick={onFormReject}
                >
                    Отменить
                </Button>
            </div>
        </Drawer>
    );
};

export default DepositDrawer;