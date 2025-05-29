import React from 'react';
import {Button, Modal} from "antd";

const DeleteModal = ({ modal, setModal, deleteItem, deleteMutation }) => {

    return (
        <Modal
            rootClassName='main-modal'
            className='delete-modal'
            open={modal === 'delete'}
            onCancel={() => setModal('close')}
            centered
            closeIcon={false}
        >
            <div className="center">
                <p className="title">Вы точно хотите удалить данную карту?</p>
                <div className="btns">
                    <Button
                        className='btn delete'
                        onClick={deleteItem}
                        loading={deleteMutation?.isPending}
                    >
                        Да, удалить
                    </Button>
                    <Button className='btn' onClick={() => setModal('close')}>Нет, выйти</Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteModal;