import React from 'react';
import cardEmpty from "../../assets/images/card-emty.svg";

const CardEmpty = ({ setModal }) => {
    return (
        <div className="empty">
            <div className="empty__content">
                <img className='img' src={cardEmpty} alt="card"/>
                <p className='title'>Пока что нет добавленных карт</p>
                <p className='desc'>Для добавление карты, нажмите на кнопку ниже</p>
                <button className='btn' onClick={() => setModal('add')}>Добавить карту</button>
            </div>
        </div>
    );
};

export default CardEmpty;