import './Swap.scss'
import React, {useState} from 'react';
import {Link} from "react-router-dom";
import img from '../../assets/images/swap1.png'
import {Form} from "antd";
import SelectedModal from "./modals/SelectedModal.jsx";
import DepositModal from "./modals/DepositModal.jsx";
import SuccessModal from "../../components/success-modal/SuccessModal.jsx";
import DepositDrawer from "./modals/DepositDrawer.jsx";
import WithdrawDrawer from "./modals/WithdrawDrawer.jsx";

const Swap = () => {

    const [selItem, setSelItem] = useState(null)
    const [modal, setModal] = useState('close')


    return (
        <div className='swap page'>
            <div className="container p0">
                <div className="swap__head">
                    <div className="titles">
                        <span className="sub">Ваш баланс</span>
                        <p className="title">{'10 000 000'} uzs</p>
                    </div>
                    <div className="btns grid">
                        <button className='btn' onClick={() => setModal('deposit')}>
                            <i className="fa-solid fa-circle-plus"/>
                            <span>Пополнить</span>
                        </button>
                        <button className='btn' onClick={() => setModal('withdraw')}>
                            <i className="fa-solid fa-circle-arrow-up"/>
                            <span>Вывести</span>
                        </button>
                    </div>
                </div>
                <div className="swap__body">
                    <p className="title">Пополнить букмекерской конторы</p>
                    <ul className='list'>
                        <li className='item' onClick={() => setSelItem([])}>
                            <img src={img} alt="image"/>
                        </li>
                        <li className='item' onClick={() => setSelItem([])}>
                            <img src={img} alt="image"/>
                        </li>
                        <li className='item' onClick={() => setSelItem([])}>
                            <img src={img} alt="image"/>
                        </li>
                        <li className='item' onClick={() => setSelItem([])}>
                            <img src={img} alt="image"/>
                        </li>
                        <li className='item' onClick={() => setSelItem([])}>
                            <img src={img} alt="image"/>
                        </li>
                    </ul>
                </div>
            </div>

            <SuccessModal
                modal={modal}
                setModal={setModal}
            />

            <DepositModal
                modal={modal}
                setModal={setModal}
            />
            <DepositDrawer
                modal={modal}
                setModal={setModal}
            />

            <WithdrawDrawer
                modal={modal}
                setModal={setModal}
            />

            <SelectedModal
                selItem={selItem}
                setSelItem={setSelItem}
                setModal={setModal}
            />
        </div>
    );
};

export default Swap;