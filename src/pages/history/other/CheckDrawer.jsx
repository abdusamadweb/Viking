import React from 'react';
import {Button, Drawer} from "antd";
import {formatCard, formatPrice} from "../../../assets/scripts/global.js";
import Timer from "./Timer.jsx";
import {Tr, trans} from "../../../components/translator/Tr.js";

const CheckDrawer = ({ selItem, setSelItem, modal, setModal }) => {

    return (
        <Drawer
            rootClassName='main-modal main-drawer fit-drawer'
            className='check-drawer'
            closable={false}
            placement='bottom'
            onClose={() => {
                setSelItem(null)
                setModal('close')
            }}
            open={modal === 'check'}
            key='bottom'
            height={'auto'}
        >
            <span className='line'/>
            <div className="titles row between align-center">
                <div className="title"><Tr val='О транзакции' /></div>
                <span className={`status ${selItem?.status}`}>{
                    selItem?.timer > 0 ? (
                            <><Tr val='Ожидает оплату' />, <Timer initialSeconds={selItem.timer} /></>
                        )
                        : selItem?.status === 'success_pay' ? trans('Успешно')
                            : selItem?.status === 'reject' ? trans('Отменено')
                                : selItem?.status === 'pending' ? trans('Проверяется') : selItem?.status
                }</span>
            </div>
            <ul className='list'>
                <li className="list__item">
                    <span className="txt"><Tr val='ID транзакции' /></span>
                    <span className="value">{ selItem?.id }</span>
                </li>
                <li className="list__item">
                    <span className="txt"><Tr val='Название' /></span>
                    <span className="value">{
                        selItem?.provider ? trans('Пополнение конторы')
                            : selItem?.program ? trans('Пополнение баланса') : trans('Снято с баланса')
                    }</span>
                </li>
                {selItem?.provider && (
                    <li className="list__item">
                        <span className="txt"><Tr val='Контора' /></span>
                        <span className="value">{ selItem?.provider?.name }</span>
                    </li>
                )}
                <li className="list__item">
                    <span className="txt"><Tr val='ID пользователя' /></span>
                    <span className="value">{ selItem?.provider ? selItem?.bet_provider : selItem?.user_id }</span>
                </li>
                <li className="list__item">
                    <span className="txt"><Tr val='Дата создание транзакции' /></span>
                    <span className="value">{ new Date(selItem?.created_at).toLocaleString() }</span>
                </li>
                {/*<li className="list__item">*/}
                {/*    <span className="txt">Дата закрытие транзакция</span>*/}
                {/*    <span className="value">05.05.2025, 16:08****</span>*/}
                {/*</li>*/}
                {selItem?.card_number && (
                    <li className="list__item">
                        <span className="txt"><Tr val='Карта' /></span>
                        <span className="value">{ formatCard(selItem?.card_number) }</span>
                    </li>
                )}

                <li className="list__item">
                    <span className="txt"><Tr val='Сумма' /></span>
                    <span className="count">{ selItem?.program && '+' } { formatPrice(selItem?.amount || 0) } uzs</span>
                </li>
            </ul>
            <div className="btns">
                <Button className='btn w100' onClick={() => {
                    setModal('close')
                    setSelItem(null)
                }}><Tr val='Закрыть' /></Button>
            </div>
        </Drawer>
    );
};

export default CheckDrawer;