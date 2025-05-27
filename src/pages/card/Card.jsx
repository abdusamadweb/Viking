import './Card.scss'
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import humo from '../../assets/images/humo-icon.svg';
import uzcard from '../../assets/images/uzcard-icon.svg';
import card from '../../assets/images/card-icon.svg';
import DeleteModal from "./modals/DeleteModal.jsx";
import AddDrawer from "./modals/AddDrawer.jsx";

const Card = () => {

    const navigate = useNavigate()

    const [modal, setModal] = useState('close')


    return (
        <div className='card-page'>
            <div className="container">
                <div className="card-page__head">
                    <div className="titles row align-center between g10">
                        <div className="row align-center g1">
                            <button className='back' onClick={() => navigate(-1)}>
                                <i className="fa-solid fa-circle-chevron-left"/>
                            </button>
                            <span>Мои карты</span>
                        </div>
                        <button className="btn" onClick={() => setModal('add')}>
                            <i className="fa-solid fa-circle-plus"/>
                        </button>
                    </div>
                </div>
                <div className="card-page__body">
                    <ul className="list flex-column g1">
                        <li className="item">
                            <div className="row between align-center">
                                <div className="row align-center g10">
                                    <div className="imgs">
                                        <img src={humo} alt="humo"/>
                                    </div>
                                    <div>
                                        <p className="name">Основная карта</p>
                                        <span className="number">**** **** 3215</span>
                                    </div>
                                </div>
                                <div className="btns">
                                    <button className="btn" onClick={() => setModal('edit')}>
                                        <i className="fa-solid fa-pen"/>
                                    </button>
                                    <button className="btn" onClick={() => setModal('delete')}>
                                        <i className="fa-solid fa-trash-can"/>
                                    </button>
                                </div>
                            </div>
                        </li>
                        <li className="item">
                            <div className="row between align-center">
                                <div className="row align-center g10">
                                    <div className="imgs">
                                        <img src={uzcard} alt="humo"/>
                                    </div>
                                    <div>
                                        <p className="name">Основная карта</p>
                                        <span className="number">**** **** 3215</span>
                                    </div>
                                </div>
                                <div className="btns">
                                    <button className="btn" onClick={() => setModal('edit')}>
                                        <i className="fa-solid fa-pen"/>
                                    </button>
                                    <button className="btn" onClick={() => setModal('delete')}>
                                        <i className="fa-solid fa-trash-can"/>
                                    </button>
                                </div>
                            </div>
                        </li>
                        <li className="item">
                            <div className="row between align-center">
                                <div className="row align-center g10">
                                    <div className="imgs">
                                        <img src={card} alt="humo"/>
                                    </div>
                                    <div>
                                        <p className="name">Основная карта</p>
                                        <span className="number">**** **** 3215</span>
                                    </div>
                                </div>
                                <div className="btns">
                                    <button className="btn" onClick={() => setModal('edit')}>
                                        <i className="fa-solid fa-pen"/>
                                    </button>
                                    <button className="btn" onClick={() => setModal('delete')}>
                                        <i className="fa-solid fa-trash-can"/>
                                    </button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <DeleteModal modal={modal} setModal={setModal} />
            <AddDrawer
                modal={modal}
                setModal={setModal}

            />
        </div>
    );
};

export default Card;