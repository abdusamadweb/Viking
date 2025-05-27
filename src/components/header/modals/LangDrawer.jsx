import React, {useState} from 'react';
import {Drawer, Radio} from "antd";
import uz from '../../../assets/images/uz.svg'
import ru from '../../../assets/images/ru.svg'

const LangDrawer = ({ modal, setModal }) => {

    const [value, setValue] = useState(null)


    return (
        <Drawer
            rootClassName='main-modal main-drawer header-drawer'
            className='header-lang-drawer'
            placement='bottom'
            closable={false}
            onClose={() => setModal('close')}
            open={modal === 'lang'}
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
                                    <img src={uz} alt="uz"/>
                                    <span className="item__title">O’zbekcha</span>
                                </div>
                            </div>,
                        },
                        {
                            value: 2,
                            label: <div className='item'>
                                <div className="row align-center g1">
                                    <img src={ru} alt="ru"/>
                                    <span className="item__title">Русский</span>
                                </div>
                            </div>,
                        },
                    ]}
                />
            </div>
        </Drawer>
    );
};

export default LangDrawer;