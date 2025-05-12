import './Home.scss'
import React, {useState} from 'react';
import SuccessModal from "../../components/success-modal/SuccessModal.jsx";
import DepositModal from "../swap/modals/DepositModal.jsx";
import DepositDrawer from "../swap/modals/DepositDrawer.jsx";
import WithdrawDrawer from "../swap/modals/WithdrawDrawer.jsx";
import {Link} from "react-router-dom";
import {Carousel} from "antd";
import girl from '../../assets/images/girl.png'

const Home = () => {

    const [modal, setModal] = useState('close')


    return (
        <div className='home page'>
            <div className="container">
                <div className="home__head row flex-column g10">
                    <button className='btn' onClick={() => setModal('deposit')}>
                        <div className="row align-center g10">
                            <i className="fa-solid fa-circle-plus"/>
                            <span>Пополнить бот</span>
                        </div>
                        <i className="fa-solid fa-chevron-right"/>
                    </button>
                    <button className='btn' onClick={() => setModal('withdraw')}>
                        <div className="row align-center g10">
                            <i className="fa-solid fa-circle-arrow-up"/>
                            <span>Вывести с бота</span>
                        </div>
                        <i className="fa-solid fa-chevron-right"/>
                    </button>
                    <Link className='btn' to='/swap'>
                        <div className="row align-center g10">
                            <i className="fa-solid fa-futbol"/>
                            <span>Пополнить букмекера</span>
                        </div>
                        <i className="fa-solid fa-chevron-right"/>
                    </Link>
                </div>
                <div className="home__body">
                    <Carousel
                        autoplay
                        dots={false}
                    >
                        <div className='item'>
                            <div className="titles">
                                Birinchi Depozit uchun <br/>
                                <span>10 000 000 mln</span> <br/>
                                Bonusga ega bo’ling!
                            </div>
                            <span className='sub'>Promokod: LimonPay</span>
                            <img className='img' src={girl} alt="img"/>
                        </div>
                    </Carousel>
                    <div className="how">
                        <div className="how__titles row align-center g10">
                            <i className="fa-solid fa-circle-info"/>
                            <span>Как пользоваться ботом?</span>
                        </div>
                        <iframe
                            className='how__iframe'
                            allowFullScreen
                            src="https://www.youtube.com/embed/VQRLujxTm3c?si=GHXQUpaREsDmWhCZ"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                        />
                    </div>
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
        </div>
    );
};

export default Home;