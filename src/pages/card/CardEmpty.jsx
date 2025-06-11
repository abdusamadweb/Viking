import React from 'react';
import cardEmpty from "../../assets/images/card-emty.svg";
import {Tr} from "../../components/translator/Tr.js";

const CardEmpty = ({ setModal }) => {
    return (
        <div className="empty">
            <div className="empty__content">
                <img className='img' src={cardEmpty} alt="card"/>
                <p className='title'><Tr val='Пока что нет добавленных карт' /></p>
                <p className='desc'><Tr val='Для добавление карты, нажмите на кнопку ниже' /></p>
                <button className='btn' onClick={() => setModal('add')}><Tr val='Добавить карту' /></button>
            </div>
        </div>
    );
};

export default CardEmpty;