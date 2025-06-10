import './Swap.scss'
import React, {useState} from 'react';
import {Empty} from "antd";
import SelectedModal from "./modals/SelectedModal.jsx";
import DepositModal from "./modals/DepositModal.jsx";
import SuccessModal from "../../components/success-modal/SuccessModal.jsx";
import DepositDrawer from "./modals/DepositDrawer.jsx";
import WithdrawDrawer from "./modals/WithdrawDrawer.jsx";
import {$resp} from "../../api/config.js";
import {useQuery} from "@tanstack/react-query";
import defImg from "../../assets/images/def-img.png"
import {formatPrice} from "../../assets/scripts/global.js";
import GetFileDef from "../../components/get-file/GetFileDef.jsx";
import WithdrawNew from "./new-modals/WithdrawNew.jsx";
import VideoModal from "./new-modals/VideoModal.jsx";
import DepositNew from "./new-modals/DepositNew.jsx";


// fetch
const fetchData = async () => {
    const { data } = await $resp.get("/provider/f-all")
    return data
}


const Swap = ({ refetchMe }) => {

    const [selItem, setSelItem] = useState(null)
    const [modal, setModal] = useState('close')
    const [modal2, setModal2] = useState('close')

    const me = JSON.parse(localStorage.getItem('me'))

    // deposit states
    const [activeTimer, setActiveTimer] = useState(false)
    const [successText, setSuccessText] = useState(false)


    // fetch
    const { data } = useQuery({
        queryKey: ['provider'],
        queryFn: fetchData,
        keepPreviousData: true,
    })


    return (
        <div className='swap page'>
            <div className="container p0">
                <div className="swap__head">
                    <div className="titles">
                        <span className="sub">Ваш баланс</span>
                        <p className="title">{ me ? formatPrice(me?.amount) : 0 } uzs</p>
                    </div>
                    <div className="btns grid">
                        <button className='btn' onClick={() => setModal(activeTimer ? 'drawer' : 'deposit')}>
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
                    <p className="title">Правила пополнения и вывода букмекерской конторы</p>
                    <div className="mb2">
                        <p className="sub-title">Пополнение</p>
                        <p className="desc">
                            <span>Минимальная сумма пополнения составляет 5 000 сум.</span> Пополнения на сумму меньше не принимаются и автоматически отклоняются системой.
                        </p>
                    </div>
                    <div>
                        <p className="sub-title">Вывод средств</p>
                        <p className="desc">
                            <span>Минимальная сумма вывода средств составляет 9999999 сум.</span> Запросы на меньшие суммы не обрабатываются.
                        </p>
                    </div>
                </div>
            </div>

            <SuccessModal
                modal={modal}
                setModal={setModal}
                successText={successText}
            />

            <WithdrawNew
                data={data}
                modal={modal}
                setModal={setModal}
                setModal2={setModal2}
                refetchMe={refetchMe}
            />
            <DepositNew
                data={data}
                modal={modal}
                setModal={setModal}
                me={me}
                refetchMe={refetchMe}
            />

            <VideoModal
                modal={modal2}
                setModal={setModal2}
            />
        </div>
    );
};

export default Swap;