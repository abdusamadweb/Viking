import React from 'react';
import {Modal, Switch} from "antd";
import profile from '../../../assets/images/profile-def.png'
import {useNavigate} from "react-router-dom";
import {formatPhone, getDeviceType} from "../../../assets/scripts/global.js";
import GetFile from "../../get-file/GetFile.jsx";
import {Tr, trans} from "../../translator/Tr.js";
import {useTranslation} from "react-i18next";
import {$resp} from "../../../api/config.js";
import {useMutation} from "@tanstack/react-query";
import {toast} from "react-hot-toast";

const fetchPhone = async () => {
    const { data } = await $resp.post("/user/ask-phone")
    return data
}

const HeaderModal = ({ modal, setModal, setModal2, theme }) => {

    const navigate = useNavigate()

    const me = JSON.parse(localStorage.getItem('me'))

    const device = getDeviceType()


    // lang
    const { i18n } = useTranslation()
    const currentLang = i18n.language.split('-')[0]


    const mutation = useMutation({
        mutationFn: fetchPhone,
        onSuccess: (res) => {
            toast.success(res.message)
        },
        onError: (err) => {
            toast.error(`Ошибка: ${err.response?.data?.message || err.message}`)
        }
    })


    return (
        <Modal
            rootClassName={`main-modal header-modal ${device === 'Desktop' ? 'desktop' : ''}`}
            width={255}
            open={modal === 'menu'}
            onCancel={() => setModal('false')}
            closeIcon={false}
        >
            <div className="imgs row align-center g10">
                {
                    me?.logo_id?.includes('http')
                        ? <img src={me.logo_id} alt="logo" />
                        : <GetFile id={me?.logo_id} defImg={profile} odiy />
                }
                <div>
                    <span className="name">{ me?.first_name + ' ' + me?.last_name }</span>
                    {
                        me?.phone_number ?
                            <span className="tel">{ formatPhone(me?.phone_number) }</span>
                            :
                            <button className='tel-auth' onClick={() => {
                                mutation.mutate()
                                setModal('phone')
                            }}>
                                <Tr val='Активировать телефон' />
                            </button>
                    }
                </div>
            </div>
            <ul className="list">
                <li className="list__item" onClick={() => {
                    setModal('close')
                    navigate('/profile')
                }}>
                    <div className="row align-center g10">
                        <i className="fa-solid fa-user"/>
                        <span><Tr val={'Профиль'} /></span>
                    </div>
                    <i className="fa-solid fa-chevron-right"/>
                </li>
                <li className="list__item" onClick={() => {
                    setModal('close')
                    navigate('/cards')
                }}>
                    <div className="row align-center g10">
                        <i className="fa-solid fa-credit-card"/>
                        <span><Tr val={'Мои карты'} /></span>
                    </div>
                    <i className="fa-solid fa-chevron-right"/>
                </li>
                <li className="list__item" onClick={() => setModal2('lang')}>
                    <div className="row align-center g10">
                        <i className="fa-solid fa-globe"/>
                        <span><Tr val={'Язык'} /></span>
                    </div>
                    <div className="aa row align-center">
                        <span className='txt'>
                            {currentLang === 'ru' && 'Русский'}
                            {currentLang === 'uz' && 'O’zbekcha'}
                            {currentLang === 'en' && 'English'}
                        </span>
                        <i className="icon fa-solid fa-chevron-right"/>
                    </div>
                </li>
                <li className="list__item" onClick={() => setModal2('theme')}>
                    <div className="row align-center g10">
                        <i className="fa-solid fa-palette"/>
                        <span><Tr val={'Тема'} /></span>
                    </div>
                    <div className="aa row align-center">
                        <span className='txt'>
                            { trans(theme === 1 ? 'Темный' : 'Светлый') }
                        </span>
                        <i className="icon fa-solid fa-chevron-right"/>
                    </div>
                </li>
                <li className="list__item">
                    <div className="row align-center g10">
                        <i className="fa-solid fa-volume-high"/>
                        <span><Tr val={'Звук'} /></span>
                    </div>
                    <Switch defaultChecked />
                </li>
            </ul>
        </Modal>
    );
};

export default HeaderModal;