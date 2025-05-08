import React, {useRef, useState} from 'react';
import {Button, Drawer, Input, Segmented, Switch, Radio} from "antd";
import {IMaskInput} from "react-imask";
import  humo from '../../../assets/images/humo-icon.svg'
import  uzcard from '../../../assets/images/uzcard-icon.svg'

const WithdrawDrawer = ({ modal, setModal }) => {

    const inputRef = useRef(null)

    const [nav, setNav] = useState(false)
    const [card, setCard] = useState(null)

    const [loading, setLoading] = useState(false)


    // onFormSubmit
    const onFormSubmit = () => {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
            setModal('success')
        }, 1000)
    }


    return (
        <Drawer
            rootClassName='main-modal main-drawer'
            className='withdraw-drawer'
            placement='bottom'
            closable={false}
            onClose={() => setModal('close')}
            open={modal === 'withdraw'}
            key='bottom'
            height={645}
        >
            <div className='bgc'>
                <span className='line'/>
                <p className="title">Вывести деньги</p>
            </div>
            <div className="cards div">
                <Segmented
                    options={['Новая карта', 'Сохраненные карты']}
                    onChange={() => setNav(!nav)}
                />
                {
                    !nav ?
                        <div>
                            <div className="cards__number">
                                <span className='txt'>Номер карты</span>
                                <IMaskInput
                                    mask='0000 0000 0000 0000'
                                    unmask={false}
                                    inputRef={inputRef}
                                    lazy={false}
                                    placeholder='0000 - 0000 - 0000 - 0000'
                                />
                                <div className='imgs row align-center'>
                                    <img className='img' src={humo} alt="img"/>
                                    <img src={uzcard} alt="img"/>
                                </div>
                            </div>
                            <div className="cards__save d-flex between align-center">
                                <p className="title">Сохранить для дальнейших транзакций</p>
                                <Switch defaultChecked />
                            </div>
                        </div>
                        :
                        <div className="cards__list">
                            <Radio.Group
                                onChange={(e) => setCard(e.target.value)}
                                value={card}
                                options={[
                                    {
                                        value: 1,
                                        label: <div className='item'>
                                            <div className="row align-center g10">
                                                <img className='img' src={humo} alt="img"/>
                                                <div>
                                                    <p className='name'>Основная карта</p>
                                                    <span className='number'>1234 **** **** 1234</span>
                                                </div>
                                            </div>
                                        </div>,
                                    },
                                    {
                                        value: 2,
                                        label: <div className='item'>
                                            <div className="row align-center g10">
                                                <img className='img' src={uzcard} alt="img"/>
                                                <div>
                                                    <p className='name'>Основная карта</p>
                                                    <span className='number'>1234 **** **** 1234</span>
                                                </div>
                                            </div>
                                        </div>,
                                    },
                                ]}
                            />
                        </div>
                }
            </div>
            <div className="price div">
                <span className='txt'>Сумма вывода</span>
                <Input
                    placeholder='Введите сумму'
                    type='tel'
                />
                <div className="balance row between align-center">
                    <div className='row align-center'>
                        <i className="fa-solid fa-wallet"/>
                        <span>Ваш баланс</span>
                    </div>
                    <span className='count'>10 000 000 uzs</span>
                </div>
            </div>
            <div className="info">
                <div className="title row align-center g10">
                    <i className="fa-solid fa-circle-info"/>
                    <span>Примечание</span>
                </div>
                <p className="desc">Укажите только карты Uzcard и Humo, на Visa и кошелки перевод не может быть осушествлён!</p>
            </div>
            <div className="btns">
                <Button
                    className='btn submit'
                    onClick={onFormSubmit}
                    loading={loading}
                >
                    Вывести
                </Button>
            </div>
        </Drawer>
    );
};

export default WithdrawDrawer;