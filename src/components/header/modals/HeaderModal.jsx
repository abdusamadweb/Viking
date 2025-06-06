import React from 'react';
import {Modal, Switch} from "antd";
import profile from '../../../assets/images/profile-def.png'
import {useNavigate} from "react-router-dom";
import {formatPhone} from "../../../assets/scripts/global.js";
import GetFile from "../../get-file/GetFile.jsx";

const HeaderModal = ({ modal, setModal, setModal2 }) => {

    const navigate = useNavigate()

    const me = JSON.parse(localStorage.getItem('me'))


    return (
        <Modal
            rootClassName='main-modal header-modal'
            width={255}
            open={modal === 'menu'}
            onCancel={() => setModal('false')}
            closeIcon={false}
        >
            <div className="imgs row align-center g10">
                <GetFile id={me?.logo_id} defImg={profile} odiy />
                <div>
                    <span className="name">{ me?.first_name + ' ' + me?.last_name }</span>
                    <span className="tel">{ formatPhone(me?.phone_number) }</span>
                </div>
            </div>
            <ul className="list">
                <li className="list__item" onClick={() => {
                    setModal('close')
                    navigate('/profile')
                }}>
                    <div className="row align-center g10">
                        <i className="fa-solid fa-user"/>
                        <span>Профиль</span>
                    </div>
                    <i className="fa-solid fa-chevron-right"/>
                </li>
                <li className="list__item" onClick={() => {
                    setModal('close')
                    navigate('/cards')
                }}>
                    <div className="row align-center g10">
                        <i className="fa-solid fa-credit-card"/>
                        <span>Мои карты</span>
                    </div>
                    <i className="fa-solid fa-chevron-right"/>
                </li>
                <li className="list__item" onClick={() => setModal2('lang')}>
                    <div className="row align-center g10">
                        <i className="fa-solid fa-globe"/>
                        <span>Язык</span>
                    </div>
                    <div className="aa row align-center">
                        <span className='txt'>Русский</span>
                        <i className="icon fa-solid fa-chevron-right"/>
                    </div>
                </li>
                {/*<li className="list__item" onClick={() => setModal2('theme')}>*/}
                {/*    <div className="row align-center g10">*/}
                {/*        <i className="fa-solid fa-palette"/>*/}
                {/*        <span>Тема</span>*/}
                {/*    </div>*/}
                {/*    <div className="aa row align-center">*/}
                {/*        <span className='txt'>Темный</span>*/}
                {/*        <i className="icon fa-solid fa-chevron-right"/>*/}
                {/*    </div>*/}
                {/*</li>*/}
                <li className="list__item">
                    <div className="row align-center g10">
                        <i className="fa-solid fa-volume-high"/>
                        <span>Звук</span>
                    </div>
                    <Switch defaultChecked />
                </li>
            </ul>
        </Modal>
    );
};

export default HeaderModal;