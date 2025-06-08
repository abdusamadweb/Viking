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


// fetch
const fetchData = async () => {
    const { data } = await $resp.get("/provider/f-all")
    return data
}


const Swap = ({ refetchMe }) => {

    const [selItem, setSelItem] = useState(null)
    const [modal, setModal] = useState('close')

    const me = JSON.parse(localStorage.getItem('me'))

    // deposit states
    const [activeTimer, setActiveTimer] = useState(false)
    const [drawerCard, setDrawerCard] = useState(null)
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
                    <div className="btns grid d-none">
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
                    <p className="title">Пополнить букмекерской конторы</p>
                    {
                        data?.length ?
                            <ul className='list'>
                                {data?.map(i => (
                                    <li
                                        className='item'
                                        onClick={() => setSelItem(i)}
                                        key={i.id}
                                    >
                                        <GetFileDef id={i?.logo_id} defImg={defImg} odiy />
                                    </li>
                                ))}
                            </ul>
                            : <Empty description={false} />
                    }
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
            <SelectedModal
                selItem={selItem}
                setSelItem={setSelItem}
                setModal={setModal}
            />
        </div>
    );
};

export default Swap;