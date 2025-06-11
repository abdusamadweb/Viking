import React, {useState} from 'react';
import {Button, Drawer, Empty, Form, Input} from "antd";
import GetFileDef from "../../../components/get-file/GetFileDef.jsx";
import defImg from "../../../assets/images/def-img.png";
import {formatPrice, validateMessages} from "../../../assets/scripts/global.js";
import {toast} from "react-hot-toast";
import {useMutation} from "@tanstack/react-query";
import {$resp} from "../../../api/config.js";
import gift from "../../../assets/images/gift.svg";
import {Tr, trans} from "../../../components/translator/Tr.js";


// fetch
const deposit = async (body) => {
    const { data } = await $resp.post("/tr-provider/deposit", body)
    return data
}
const chechId = async (body) => {
    const { data } = await $resp.post("/tr-provider/check-id", body)
    return data
}


const DepositNew = ({ data, modal, setModal, me, refetchMe }) => {

    const [form] = Form.useForm()

    const [selItem, setSelItem] = useState(null)
    const [nav, setNav] = useState(1)

    const [check, setCheck] = useState(null)


    // mutate
    const muCheck = useMutation({
        mutationFn: chechId,
        onSuccess: (res) => {
            toast.success(res.message)

            setCheck(res?.player?.Name)
        },
        onError: (err) => {
            toast.error(`Ошибка: ${err.response?.data?.message || err.message}`)
        }
    })

    const mutation = useMutation({
        mutationFn: deposit,
        onSuccess: (res) => {
            toast.success(res.message)

            setNav(1)
            setSelItem(null)
            setModal('success')

            refetchMe()
        },
        onError: (err) => {
            toast.error(`Ошибка: ${err.response?.data?.message || err.message}`)
        }
    })

    const onFormSubmit = (val) => {
        const body = {
            ...val,
            provider_id: selItem?.id
        }
        if (!check) {
            muCheck.mutate(body)
        } else {
            mutation.mutate(body)
        }
    }


    // nav func
    function do2(i) {
        setNav(2)
        setSelItem(i)
    }


    // close - modal
    function closeModal() {
        setNav(1)
        setModal('close')
        setSelItem(null)
        setCheck(null)
    }


    return (
        <Drawer
            rootClassName='main-modal main-drawer'
            className='withdraw-drawer withdraw-provider-new deposit-provider-new'
            placement='bottom'
            closable={false}
            onClose={closeModal}
            open={modal === 'deposit'}
            key='bottom'
            // height={nav === 2 ? 600 : 433}
            height={'auto'}
        >
            <div className="bgc">
                <span className='line'/>
                <p className="title">
                    {nav === 1 && trans('Пополнение букмекерской конторы')}
                    {nav === 2 && trans('Введите данные')}
                </p>
                <div className="dots">
                    <span className={`dot ${nav === 1 ? 'active' : ''}`}/>
                    <span className={`dot ${nav === 2 ? 'active' : ''}`}/>
                </div>
            </div>
            {nav === 1 && (
                data?.length ?
                    <div className="div">
                        <ul className='list'>
                            {data?.map(i => (
                                <li
                                    className='item'
                                    key={i.id}
                                    onClick={() => do2(i)}
                                >
                                    <GetFileDef id={i?.logo_id} defImg={defImg} odiy />
                                </li>
                            ))}
                        </ul>
                    </div>
                    : <div className="div">
                        <Empty description={false} />
                    </div>
            )}

            {nav === 2 && (
                <>
                    <div className="div">
                        <Form
                            id="myForm"
                            onFinish={onFormSubmit}
                            layout='vertical'
                            validateMessages={validateMessages}
                            form={form}
                        >
                            <Form.Item
                                name='id'
                                label={trans('Введите ID')}
                                rules={[{ required: true }]}
                            >
                                <Input
                                    placeholder={trans('Ваше ID...')}
                                    type="tel"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                />
                            </Form.Item>

                            {check !== null && (
                                <p className='player'>{ check }</p>
                            )}

                            <Form.Item
                                name='amount'
                                label={trans('Сумма ввода')}
                                rules={[{ required: true }]}
                            >
                                <Input
                                    placeholder={trans('Сумма ввода')}
                                    type="tel"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                />
                            </Form.Item>

                            <div className='balance row between align-center'>
                                <div className="txt row align-center g10">
                                    <i className="fa-solid fa-wallet"></i>
                                    <span className='txt'><Tr val='Ваш баланс' /></span>
                                </div>
                                <span className='price'>{ formatPrice(me?.amount | 0) } uzs</span>
                            </div>
                        </Form>
                    </div>

                    <div className="div mx1">
                        <div className="ad d-flex g10">
                            <img src={gift} alt="icon"/>
                            <div>
                                <p className='desc'><Tr val='Получите бонус 10 000 000 сум на свой первый депозит!' /></p>
                                <button
                                    className="promo row align-center"
                                    onClick={() => {
                                        navigator.clipboard.writeText('LimonPay')
                                            .then(() => toast.success(trans('Скопирован!')))
                                            .catch(() => toast.error(trans('Ошибка при копировании')))
                                    }}
                                >
                                    <span><Tr val='Промокод' />: LimonPay</span>
                                    <i className="fa-solid fa-copy"/>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="btns grid">
                        <Button
                            className='btn submit'
                            form="myForm"
                            htmlType='submit'
                            loading={nav === 2 ? muCheck.isPending : mutation.isPending}
                        >
                            <Tr val='Пополнить' />
                        </Button>
                    </div>
                </>
            )}
        </Drawer>
    );
};

export default DepositNew;