import React from 'react';
import {Drawer} from "antd";

const LangDrawer = ({ modal, setModal }) => {



    return (
        <Drawer
            rootClassName='main-modal main-drawer'
            className='header-drawer'
            placement='bottom'
            closable={false}
            onClose={() => setModal('close')}
            open={modal === 'theme'}
            key='bottom'
            height={300}
        >

        </Drawer>
    );
};

export default LangDrawer;