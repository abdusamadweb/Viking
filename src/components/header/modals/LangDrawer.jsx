import React from 'react';
import {Drawer, Radio} from "antd";
import uz from '../../../assets/images/uz.svg'
import ru from '../../../assets/images/ru.svg'
import en from '../../../assets/images/en.png'
import {useTranslation} from "react-i18next"
import {Tr} from "../../translator/Tr.js";

const LangDrawer = ({ modal, setModal, setEffect }) => {


    // lang
    const { i18n } = useTranslation()
    const currentLang = i18n.language.split('-')[0]

    const changeLang = async (e) => {
        const lang = e.target.value
        await i18n.changeLanguage(lang)
        localStorage.setItem('i18nextLng', lang) // <-- bu muhim

        setEffect(prev => !prev)
    }


    return (
        <Drawer
            rootClassName='main-modal main-drawer header-drawer'
            className='header-lang-drawer'
            placement='bottom'
            closable={false}
            onClose={() => setModal('close')}
            open={modal === 'lang'}
            key='bottom'
            height={266}
        >
            <span className='line'/>
            <p className="title">
                <Tr val={'Язык'} />
            </p>
            <div className="cards-list">
                <Radio.Group
                    onChange={changeLang}
                    value={currentLang}
                    options={[
                        {
                            value: 'ru',
                            label: <div className='item'>
                                <div className="row align-center g1">
                                    <img src={ru} alt="ru"/>
                                    <span className="item__title">Русский</span>
                                </div>
                            </div>,
                        },
                        {
                            value: 'uz',
                            label: <div className='item'>
                                <div className="row align-center g1">
                                    <img src={uz} alt="uz"/>
                                    <span className="item__title">O’zbekcha</span>
                                </div>
                            </div>,
                        },
                        {
                            value: 'en',
                            label: <div className='item'>
                                <div className="row align-center g1">
                                    <img src={en} alt="en"/>
                                    <span className="item__title">English</span>
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