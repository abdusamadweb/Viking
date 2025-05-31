import './Home.scss'
import React, {useState} from 'react';
import SuccessModal from "../../components/success-modal/SuccessModal.jsx";
import DepositModal from "../swap/modals/DepositModal.jsx";
import DepositDrawer from "../swap/modals/DepositDrawer.jsx";
import WithdrawDrawer from "../swap/modals/WithdrawDrawer.jsx";
import {Link} from "react-router-dom";
import {Carousel} from "antd";
import ban1 from '../../assets/images/banner1.png'
import ban2 from '../../assets/images/banner2.png'
import ban3 from '../../assets/images/banner3.png'

const Home = ({ refetchMe }) => {

    const [modal, setModal] = useState('close')

    // deposit states
    const [activeTimer, setActiveTimer] = useState(false)
    const [drawerCard, setDrawerCard] = useState(null)
    const [successText, setSuccessText] = useState(false)


    return (
        <div className='home page'>
            <div className="container">
                <div className="home__body">
                    <Carousel
                        autoplay
                        dots={false}
                    >
                        <div className='item'>
                            <img className='banner' src={ban1} alt="banner"/>
                        </div>
                        <div className='item'>
                            <img className='banner' src={ban2} alt="banner"/>
                        </div>
                        <div className='item'>
                            <img className='banner' src={ban3} alt="banner"/>
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
            </div>

            <SuccessModal
                modal={modal}
                setModal={setModal}
                successText={successText}
            />

            <DepositModal
                modal={modal}
                setModal={setModal}
                setActiveTimer={setActiveTimer}
                setDrawerCard={setDrawerCard}
            />
            <DepositDrawer
                modal={modal}
                setModal={setModal}
                setActiveTimer={setActiveTimer}
                drawerCard={drawerCard}
                setSuccessText={setSuccessText}
                refetchMe={refetchMe}
            />

            <WithdrawDrawer
                modal={modal}
                setModal={setModal}
                setSuccessText={setSuccessText}
                refetchMe={refetchMe}
            />
        </div>
    );
};

export default Home;