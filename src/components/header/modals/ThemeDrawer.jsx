import React from 'react';
import {Drawer} from "antd";

const ThemeDrawer = ({ modal, setModal }) => {



    return (
        <Drawer
            rootClassName='main-modal main-drawer'
            className='header-drawer'
            placement='bottom'
            closable={false}
            onClose={() => setModal('close')}
            open={modal === 'lang'}
            key='bottom'
            height={300}
        >

        </Drawer>
    );
};

export default ThemeDrawer;