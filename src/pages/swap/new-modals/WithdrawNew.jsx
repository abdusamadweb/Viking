import React, {useState} from 'react';
import {Button, Drawer, Empty, Form, Input} from "antd";
import GetFileDef from "../../../components/get-file/GetFileDef.jsx";
import defImg from "../../../assets/images/def-img.png";
import {validateMessages} from "../../../assets/scripts/global.js";
import {toast} from "react-hot-toast";
import {useMutation} from "@tanstack/react-query";
import {$resp} from "../../../api/config.js";
import {Tr, trans} from "../../../components/translator/Tr.js";


// fetch
const withdraw = async (body) => {
    const { data } = await $resp.post("/tr-provider/withdraw", body)
    return data
}
const chechId = async (body) => {
    const { data } = await $resp.post("/tr-provider/check-id", body)
    return data
}


const WithdrawNew = ({ data, modal, setModal, setModal2, refetchMe }) => {

    const [form] = Form.useForm()

    const [selItem, setSelItem] = useState()
    const [nav, setNav] = useState(1)

    const [check, setCheck] = useState(null)
    const [loading, setLoading] = useState(false)


    // mutate
    const muCheck = useMutation({
        mutationFn: chechId,
        onSuccess: (res) => {
            toast.success(res.message)

            setCheck(res?.player?.Name)
            setTimeout(() => {
                setNav(3)
                setLoading(false)
            }, 1500)
        },
        onError: (err) => {
            setLoading(false)
            toast.error(`Ошибка: ${err.response?.data?.message || err.message}`)
        }
    })

    const mutation = useMutation({
        mutationFn: withdraw,
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
            setLoading(true)
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
            className='withdraw-drawer withdraw-provider-new'
            placement='bottom'
            closable={false}
            onClose={closeModal}
            open={modal === 'withdraw'}
            key='bottom'
            height={nav === 3 ? 480 : 464}
        >
            <div className="bgc">
                <span className='line'/>
                <p className="title">
                    {nav === 1 && trans('Вывод денег из букмекерской конторы')}
                    {nav >= 2 && trans('Введите данные')}
                </p>
                <div className="dots">
                    <span className={`dot ${nav === 1 ? 'active' : ''}`}/>
                    <span className={`dot ${nav === 2 ? 'active' : ''}`}/>
                    <span className={`dot ${nav === 3 ? 'active' : ''}`}/>
                </div>
            </div>
            <div className="div">
                {nav === 1 && (
                    data?.length ?
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
                        : <Empty description={false} />
                )}

                {nav >= 2 && (
                    <Form
                        onFinish={onFormSubmit}
                        layout='vertical'
                        validateMessages={validateMessages}
                        form={form}
                    >
                        <div>
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
                        </div>

                        {nav === 3 && (
                            <>
                                <Form.Item
                                    name='code'
                                    label={trans('Код')}
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        placeholder={trans('Код')}
                                        type="tel"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                    />
                                </Form.Item>
                                <button
                                    className="info-title w100 d-flex center align-center g10"
                                    type='button'
                                    onClick={() => setModal2('video')}
                                >
                                    <i className="fa-solid fa-circle-info"/>
                                    <span><Tr val='Как получить код?' /></span>
                                </button>
                            </>
                        )}

                        <div className="btns grid">
                            <Button
                                className='btn submit'
                                htmlType='submit'
                                loading={nav === 2 ? loading : mutation.isPending}
                            >
                                <Tr val='Пополнить' />
                            </Button>
                        </div>
                    </Form>
                )}
            </div>
        </Drawer>
    );
};

export default WithdrawNew;