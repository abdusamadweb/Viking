import React from 'react';
import {Modal} from "antd";

const HeaderModal = ({ modal, setModal }) => {




    return (
        <Modal
            rootClassName='main-modal header-modal'
            open={modal}
            onCancel={() => setModal(false)}
            centered
        >
s
        </Modal>
    );
};

export default HeaderModal;