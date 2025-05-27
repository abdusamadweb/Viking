import React, {useState} from 'react';
import {Drawer, Radio} from "antd";

const ThemeDrawer = ({ modal, setModal }) => {

    const [value, setValue] = useState(null)


    return (
        <Drawer
            rootClassName='main-modal main-drawer header-drawer'
            className='header-lang-drawer'
            placement='bottom'
            closable={false}
            onClose={() => setModal('close')}
            open={modal === 'theme'}
            key='bottom'
        >
            <span className='line'/>
            <p className="title">Тема</p>
            <div className="cards-list">
                <Radio.Group
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    options={[
                        {
                            value: 1,
                            label: <div className='item'>
                                <div className="row align-center g1">
                                    <i className="fa-solid fa-mobile-screen-button"/>
                                    <span className="item__title">Системный</span>
                                </div>
                            </div>,
                        },
                        {
                            value: 2,
                            label: <div className='item'>
                                <div className="row align-center g1">
                                    <i className="fa-solid fa-moon"/>
                                    <span className="item__title">Ночь</span>
                                </div>
                            </div>,
                        },
                        {
                            value: 3,
                            label: <div className='item'>
                                <div className="row align-center g1">
                                    <i className="fa-solid fa-sun"/>
                                    <span className="item__title">День</span>
                                </div>
                            </div>,
                        },
                    ]}
                />
            </div>
        </Drawer>
    );
};

export default ThemeDrawer;