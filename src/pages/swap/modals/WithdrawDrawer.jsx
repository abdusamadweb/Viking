import React, {useState} from 'react';
import {Button, Drawer, Input, Radio, Segmented} from "antd";
import {IMaskInput} from "react-imask";
import humo from '../../../assets/images/humo-icon.svg'
import uzcard from '../../../assets/images/uzcard-icon.svg'
import {$resp} from "../../../api/config.js";
import {toast} from "react-hot-toast";
import {useMutation} from "@tanstack/react-query";
import cardI from "../../../assets/images/card-icon.svg";
import {formatPrice} from "../../../assets/scripts/global.js";


// fetch
const withdraw = async (body) => {
    const { data } = await $resp.post("/transaction/withdraw-balance", body)
    return data
}


const WithdrawDrawer = ({ modal, setModal, setSuccessText }) => {

    const cards = JSON.parse(localStorage.getItem('cards'))
    const me = JSON.parse(localStorage.getItem('me'))

    const [nav, setNav] = useState(false)

    const [card, setCard] = useState(null)
    const [amount, setAmount] = useState(0)


    // mutate
    const mutation = useMutation({
        mutationFn: withdraw,
        onSuccess: (res) => {
            toast.success(res.message)

            setSuccessText(res.data.status)
            setModal('success')
        },
        onError: (err) => {
            toast.error(`Ошибка: ${err.response?.data?.message || err.message}`)
        }
    })


    const onFormSubmit = () => {
        const body = {
            card_id: card,
            amount: Number(amount),
        }

        mutation.mutate(body)
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
            height={600}
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
                                    className='inp-mask'
                                    mask='0000 0000 0000 0000'
                                    placeholder='0000 - 0000 - 0000 - 0000'
                                    onChange={(e) => setCard(e.target.value)}
                                />
                                <div className='imgs row align-center'>
                                    <img className='img' src={humo} alt="img"/>
                                    <img src={uzcard} alt="img"/>
                                </div>
                            </div>
                            {/*<div className="cards__save d-flex between align-center">*/}
                            {/*    <p className="title">Сохранить для дальнейших транзакций</p>*/}
                            {/*    <Switch defaultChecked />*/}
                            {/*</div>*/}
                        </div>
                        :
                        <div className="cards__list">
                            <Radio.Group
                                onChange={(e) => setCard(e.target.value)}
                                value={card}
                                options={cards?.map(i => ({
                                    value: i.id,
                                    label: (
                                        <div className='item'>
                                            <div className="row align-center g10">
                                                <img className='img' src={i.card_img === 'humo' ? humo : i.card_img === 'uzcard' ? uzcard : cardI} alt="humo"/>
                                                <div>
                                                    <p className='name'>{ i.name }</p>
                                                    <span className='number'>{ i.number }</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }))}
                            />
                        </div>
                }
            </div>
            <div className="price div">
                <span className='txt'>Сумма вывода</span>
                <Input
                    placeholder='Введите сумму'
                    type='tel'
                    onChange={(e) => setAmount(e.target.value)}
                />
                <div className="balance row between align-center">
                    <div className='row align-center'>
                        <i className="fa-solid fa-wallet"/>
                        <span>Ваш баланс</span>
                    </div>
                    <span className='count'>{ formatPrice(me?.amount || 0) } uzs</span>
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
                    loading={mutation.isPending}
                >
                    Вывести
                </Button>
            </div>
        </Drawer>
    );
};

export default WithdrawDrawer;