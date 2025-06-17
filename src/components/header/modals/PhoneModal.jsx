import React from 'react';
import {Button, Modal} from "antd";
import success from "../../../assets/images/timer.svg";
import {Tr} from "../../translator/Tr.js";

const HeaderModal = ({ modal, setModal }) => {


    return (
        <Modal
            rootClassName='main-modal success-modal'
            className='phone-modal'
            open={modal === 'phone'}
            onCancel={() => setModal('false')}
            centered
            closeIcon={false}
        >
            <div className="center">
                <img className='img' src={success} alt="icon"/>
                <p className="title">
                    <Tr val='Пожалуйста, отправьте свой контакт в чат' />!
                </p>
                <p className="desc">

                </p>
                <div className="btns">
                    <Button className='btn' onClick={() => setModal('close')}><Tr val={'Закрыть'} /></Button>
                </div>
            </div>
        </Modal>
    );
};

export default HeaderModal;