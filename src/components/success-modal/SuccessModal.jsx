import React from 'react';
import {Button, Modal} from "antd";
import success from '../../assets/images/success-modal-icon.svg'

const SuccessModal = ({ modal, setModal }) => {
    return (
        <Modal
            rootClassName='main-modal'
            className='success-modal'
            open={modal === 'success'}
            onCancel={() => setModal('close')}
            centered
            closeIcon={false}
        >
            <div className="center">
                <img className='img' src={success} alt="icon"/>
                <p className="title">Успешно пополнено!</p>
                <p className="desc">Деньги обычно поступят на баланс в течение 10-30 минут.</p>
                <div className="btns">
                    <Button className='btn' onClick={() => setModal('close')}>Закрыть</Button>
                </div>
            </div>
        </Modal>
    );
};

export default SuccessModal;