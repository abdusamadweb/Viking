import './Swap.scss'
import React, {useState} from 'react';
import SuccessModal from "../../components/success-modal/SuccessModal.jsx";
import {$resp} from "../../api/config.js";
import {useQuery} from "@tanstack/react-query";
import {formatPrice} from "../../assets/scripts/global.js";
import WithdrawNew from "./new-modals/WithdrawNew.jsx";
import VideoModal from "./new-modals/VideoModal.jsx";
import DepositNew from "./new-modals/DepositNew.jsx";
import {Tr} from "../../components/translator/Tr.js";


// fetch
const fetchData = async () => {
    const { data } = await $resp.get("/provider/f-all")
    return data
}


const Swap = ({ refetchMe }) => {

    const me = JSON.parse(localStorage.getItem('me'))

    const [modal, setModal] = useState('close')
    const [modal2, setModal2] = useState('close')

    const [successText, _] = useState(false)


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
                        <span className="sub"><Tr val='Ваш баланс' /></span>
                        <p className="title">{ me ? formatPrice(me?.amount) : 0 } uzs</p>
                    </div>
                    <div className="btns grid">
                        <button className='btn' onClick={() => setModal('deposit')}>
                            <i className="fa-solid fa-circle-plus"/>
                            <span><Tr val='Пополнить' /></span>
                        </button>
                        <button className='btn' onClick={() => setModal('withdraw')}>
                            <i className="fa-solid fa-circle-arrow-up"/>
                            <span><Tr val='Вывести' /></span>
                        </button>
                    </div>
                </div>
                <div className="swap__body">
                    <p className="title"><Tr val='Правила пополнения и вывода букмекерской конторы' /></p>
                    <div className="mb2">
                        <p className="sub-title"><Tr val='Пополнение' /></p>
                        <p className="desc">
                            <span><Tr val='Минимальная сумма пополнения составляет 5 000 сум' />.</span> <Tr val='Пополнения на сумму меньше не принимаются и автоматически отклоняются системой' />.
                        </p>
                    </div>
                    <div>
                        <p className="sub-title"><Tr val='Вывод средств' /></p>
                        <p className="desc">
                            <span><Tr val='Минимальная сумма вывода средств составляет 9 999 999 сум' />.</span> <Tr val='Запросы на меньшие суммы не обрабатываются' />.
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