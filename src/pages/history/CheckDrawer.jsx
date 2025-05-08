import React from 'react';
import {Button, Drawer} from "antd";

const CheckDrawer = ({ selItem, setSelItem }) => {

    return (
        <Drawer
            rootClassName='main-modal main-drawer'
            className='check-drawer'
            placement='bottom'
            closable={false}
            onClose={() => setSelItem(null)}
            open={selItem}
            key='bottom'
            height={565}
        >
            <span className='line'/>
            <div className="titles row between align-center">
                <div className="title">О транзакции</div>
                <span className="status">Успешно</span>
            </div>
            <ul className='list'>
                <li className="list__item">
                    <span className="txt">ID транзакции</span>
                    <span className="value">№465483218</span>
                </li>
                <li className="list__item">
                    <span className="txt">Название</span>
                    <span className="value">Пополнение конторы</span>
                </li>
                <li className="list__item">
                    <span className="txt">Контора</span>
                    <span className="value">1****</span>
                </li>
                <li className="list__item">
                    <span className="txt">ID пользователя</span>
                    <span className="value">321962315</span>
                </li>
                <li className="list__item">
                    <span className="txt">Дата создание транзакция</span>
                    <span className="value">05.05.2025, 16:08</span>
                </li>
                <li className="list__item">
                    <span className="txt">Дата закрытие транзакция</span>
                    <span className="value">05.05.2025, 16:08****</span>
                </li>

                <li className="list__item">
                    <span className="txt">Сумма</span>
                    <span className="count">+20 000 сум</span>
                </li>
            </ul>
            <div className="btns">
                <Button className='btn w100' onClick={() => setSelItem(null)}>Закрыть</Button>
            </div>
        </Drawer>
    );
};

export default CheckDrawer;