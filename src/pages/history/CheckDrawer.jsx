import React from 'react';
import {Button, Drawer} from "antd";
import {formatCard, formatPrice} from "../../assets/scripts/global.js";

const CheckDrawer = ({ selItem, setSelItem }) => {

    console.log(selItem)


    return (
        <Drawer
            rootClassName='main-modal main-drawer fit-drawer'
            className='check-drawer'
            placement='bottom'
            closable={false}
            onClose={() => setSelItem(null)}
            open={selItem}
            key='bottom'
            height={505}
        >
            <span className='line'/>
            <div className="titles row between align-center">
                <div className="title">О транзакции</div>
                <span className={`status ${selItem?.status}`}>{
                    selItem?.timer > 0 ? 'Ожидает оплату, ' + selItem?.timer
                        : selItem?.status === 'success_pay' ? 'Успешно'
                            : selItem?.status === 'reject' ? 'Отменено'
                                : selItem?.status === 'pending' ? 'Проверяется' : selItem?.status
                }</span>
            </div>
            <ul className='list'>
                <li className="list__item">
                    <span className="txt">ID транзакции</span>
                    <span className="value">{ selItem?.id }</span>
                </li>
                <li className="list__item">
                    <span className="txt">Название</span>
                    <span className="value">{
                        selItem?.provider ? 'Пополнение конторы'
                            : selItem?.program ? 'Пополнение баланса' : 'Снято с баланса'
                    }</span>
                </li>
                {selItem?.provider && (
                    <li className="list__item">
                        <span className="txt">Контора</span>
                        <span className="value">{ selItem?.provider?.name }</span>
                    </li>
                )}
                <li className="list__item">
                    <span className="txt">ID пользователя</span>
                    <span className="value">{ selItem?.provider ? selItem?.bet_provider : selItem?.user_id }</span>
                </li>
                <li className="list__item">
                    <span className="txt">Дата создание транзакция</span>
                    <span className="value">{ new Date(selItem?.created_at).toLocaleString() }</span>
                </li>
                {/*<li className="list__item">*/}
                {/*    <span className="txt">Дата закрытие транзакция</span>*/}
                {/*    <span className="value">05.05.2025, 16:08****</span>*/}
                {/*</li>*/}
                {selItem?.card_number && (
                    <li className="list__item">
                        <span className="txt">Карта</span>
                        <span className="value">{ formatCard(selItem?.card_number) }</span>
                    </li>
                )}

                <li className="list__item">
                    <span className="txt">Сумма</span>
                    <span className="count">{ selItem?.program && '+' } { formatPrice(selItem?.amount || 0) } сум</span>
                </li>
            </ul>
            <div className="btns">
                <Button className='btn w100' onClick={() => setSelItem(null)}>Закрыть</Button>
            </div>
        </Drawer>
    );
};

export default CheckDrawer;