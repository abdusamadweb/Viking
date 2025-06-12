import React from 'react';
import {Drawer, Radio} from "antd";
import {Tr} from "../../translator/Tr.js";
import {useTheme} from "../../../context/ThemeContext.jsx";

const ThemeDrawer = ({ modal, setModal }) => {

    const { theme, changeTheme } = useTheme()


    return (
        <Drawer
            rootClassName='main-modal main-drawer header-drawer'
            className='header-lang-drawer'
            placement='bottom'
            closable={false}
            onClose={() => setModal('close')}
            open={modal === 'theme'}
            key='bottom'
            height={210}
        >
            <span className='line'/>
            <p className="title">
                <Tr val={'Тема'} />
            </p>
            <div className="cards-list">
                <Radio.Group
                    value={theme === 'dark' ? 1 : 2}
                    onChange={(e) => changeTheme(e.target.value)}
                    options={[
                        {
                            value: 1,
                            label: <div className='item'>
                                <div className="row align-center g1">
                                    <i className="fa-solid fa-moon"/>
                                    <span className="item__title">
                                        <Tr val={'Ночь'} />
                                    </span>
                                </div>
                            </div>,
                        },
                        {
                            value: 2,
                            label: <div className='item'>
                                <div className="row align-center g1">
                                    <i className="fa-solid fa-sun"/>
                                    <span className="item__title">
                                        <Tr val={'День'} />
                                    </span>
                                </div>
                            </div>,
                        },
                        // {
                        //     value: 1,
                        //     label: <div className='item'>
                        //         <div className="row align-center g1">
                        //             <i className="fa-solid fa-mobile-screen-button"/>
                        //             <span className="item__title">Системный</span>
                        //         </div>
                        //     </div>,
                        // },
                    ]}
                />
            </div>
        </Drawer>
    );
};

export default ThemeDrawer;