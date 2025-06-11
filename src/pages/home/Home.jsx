import './Home.scss'
import React, {useState} from 'react';
import SuccessModal from "../../components/success-modal/SuccessModal.jsx";
import DepositModal from "../swap/modals/DepositModal.jsx";
import DepositDrawer from "../swap/modals/DepositDrawer.jsx";
import WithdrawDrawer from "../swap/modals/WithdrawDrawer.jsx";
import {Link} from "react-router-dom";
import {Carousel} from "antd";
import {$resp} from "../../api/config.js";
import {useQuery} from "@tanstack/react-query";
import GetFileDef from "../../components/get-file/GetFileDef.jsx";
import {Tr} from "../../components/translator/Tr.js";


// fetch
const fetchSlider = async () => {
    const { data } = await $resp.get("/slider/all")
    return data
}


const Home = ({ refetchMe }) => {

    const [modal, setModal] = useState('close')

    // deposit states
    const [_, setActiveTimer] = useState(false)
    const [drawerCard, setDrawerCard] = useState(null)
    const [successText, setSuccessText] = useState(false)


    // fetch
    const { data } = useQuery({
        queryKey: ['slider'],
        queryFn: fetchSlider,
        keepPreviousData: true,
    })


    return (
        <div className='home page'>
            <div className="container">
                <div className="home__body">
                    <Carousel
                        autoplay
                        dots={false}
                        lazyLoad={data?.data}
                    >
                        {
                            data?.data?.map(i => (
                                <a
                                    className='item'
                                    key={i.id}
                                    href={i.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <GetFileDef className='banner' id={i.photo_id} odiy />
                                </a>
                            ))
                        }
                    </Carousel>
                    <div className="how">
                        <div className="how__titles row align-center g10">
                            <i className="fa-solid fa-circle-info"/>
                            <span><Tr val={'Как пользоваться ботом?'} /></span>
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
                            <span><Tr val={'Пополнить бот'} /></span>
                        </div>
                        <i className="fa-solid fa-chevron-right"/>
                    </button>
                    <button className='btn' onClick={() => setModal('withdraw')}>
                        <div className="row align-center g10">
                            <i className="fa-solid fa-circle-arrow-up"/>
                            <span><Tr val={'Вывести с бота'} /></span>
                        </div>
                        <i className="fa-solid fa-chevron-right"/>
                    </button>
                    {/*<Link className='btn' to='/swap'>*/}
                    {/*    <div className="row align-center g10">*/}
                    {/*        <i className="fa-solid fa-futbol"/>*/}
                    {/*        <span>Пополнить букмекера</span>*/}
                    {/*    </div>*/}
                    {/*    <i className="fa-solid fa-chevron-right"/>*/}
                    {/*</Link>*/}
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