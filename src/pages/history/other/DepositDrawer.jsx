import React, {useEffect, useState} from 'react';
import {Button, Drawer} from "antd";
import logo from '../../../assets/images/big-logo.svg'
import timer from '../../../assets/images/timer.svg'
import {formatCard, formatPrice} from "../../../assets/scripts/global.js";
import {toast} from "react-hot-toast";
import {useMutation} from "@tanstack/react-query";
import {$resp} from "../../../api/config.js";
import Timer from "./Timer.jsx";
import {Tr, trans} from "../../../components/translator/Tr.js";


// fetch
const completeDeposit = async (body) => {
    const { data } = await $resp.post("/transaction/deposit/complete", body)
    return data
}


const DepositDrawer = ({ selItem, setSelItem, modal, setModal, setSuccessText, refetch }) => {


    // mutate
    const mutation = useMutation({
        mutationFn: completeDeposit,
        onSuccess: (res) => {
            toast.success(res.message)

            refetch()

            setSuccessText(res.data.status)
            setModal('success')
            setSelItem(null)
        },
        onError: (err) => {
            toast.error(`Ошибка: ${err.response?.data?.message || err.message}`)
        }
    })

    const onFormSubmit = () => {
        const body = {
            trans_id: selItem.id,
            status: true
        }

        mutation.mutate(body)
    }
    const onFormReject = () => {
        const body = {
            trans_id: selItem.id,
            status: "false"
        }

        mutation.mutate(body)
    }


    return (
        <Drawer
            rootClassName='main-modal main-drawer'
            className='deposit-drawer'
            closable={false}
            placement='bottom'
            onClose={() => {
                setModal('close')
                setSelItem(false)
            }}
            open={modal === 'drawer'}
            key='bottom'
            // height={545}
            height={'auto'}
        >
            <span className='line'/>
            <p className="title"><Tr val='Переведите сумму на указанному карту ниже' /></p>
            <div className="card">
                <img className='card__img' src={logo} alt="img"/>
                <button
                    className="card__number row align-center g10"
                    onClick={() => {
                        navigator.clipboard.writeText(selItem?.card_number)
                            .then(() => toast.success(trans('Скопирован!')))
                            .catch(() => toast.error(trans('Ошибка при копировании')))
                    }}
                >
                    <span>{ formatCard(selItem?.card_number) }</span>
                    <i className="fa-solid fa-copy"/>
                </button>
                <span className="card__name">{ selItem?.card_name || 'No Name' }</span>
                <div className="card__price row between">
                    <span className="txt"><Tr val='Сумма' /></span>
                    <span className="count">{ formatPrice(selItem?.amount || 0) } uzs</span>
                </div>
            </div>
            <div className="info">
                <div className="title row align-center g10">
                    <i className="fa-solid fa-circle-info"/>
                    <span><Tr val='Примечание' /></span>
                </div>
                <p className="desc"><Tr val='Сумма нужно перевести точно, не меньше, не больше!' /></p>
            </div>
            <div className="timer center row align-center g10">
                <img src={timer} alt="icon"/>
                <span>{ <Timer initialSeconds={selItem?.timer} /> }</span>
            </div>
            <div className="btns">
                <Button
                    className='btn submit'
                    htmlType='submit'
                    onClick={onFormSubmit}
                    loading={mutation.isPending}
                >
                    <Tr val='Я перевел указанную сумму' />
                </Button>
                <Button
                    className='btn'
                    onClick={onFormReject}
                >
                    <Tr val='Отменить' />
                </Button>
            </div>
        </Drawer>
    );
};

export default DepositDrawer;