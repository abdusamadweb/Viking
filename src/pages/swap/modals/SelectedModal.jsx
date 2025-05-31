import React, {useState} from 'react';
import gift from "../../../assets/images/gift.svg";
import {Button, Form, Input, Modal} from "antd";
import {formatPrice, validateMessages} from "../../../assets/scripts/global.js";
import defImg from "../../../assets/images/def-img.png";
import {toast} from "react-hot-toast";
import {useMutation} from "@tanstack/react-query";
import {$resp} from "../../../api/config.js";
import GetFileDef from "../../../components/get-file/GetFileDef.jsx";


// fetch
const deposit = async (body) => {
    const { data } = await $resp.post("/tr-provider/deposit", body)
    return data
}
const chechId = async (body) => {
    const { data } = await $resp.post("/tr-provider/check-id", body)
    return data
}


const SelectedModal = ({ selItem, setSelItem, setModal }) => {

    const [form] = Form.useForm()

    const [check, setCheck] = useState(null)

    const me = JSON.parse(localStorage.getItem('me'))


    // mutate
    const mutation = useMutation({
        mutationFn: deposit,
        onSuccess: (res) => {
            toast.success(res.message)

            setSelItem(null)
            setModal('success')
        },
        onError: (err) => {
            toast.error(`Ошибка: ${err.response?.data?.message || err.message}`)
        }
    })
    const muCheck = useMutation({
        mutationFn: chechId,
        onSuccess: (res) => {
            toast.success(res.message)

            setCheck(res.player.Name)
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
       if (check === null) {
           muCheck.mutate(body)
       } else {
            mutation.mutate(body)
        }
    }
    console.log(check)


    return (
        <Modal
            rootClassName='main-modal'
            className='selected-modal'
            open={selItem}
            onCancel={() => setSelItem(null)}
            centered
        >
            <GetFileDef className='img' id={selItem?.logo_id} defImg={defImg} odiy />
            <p className="title">Пополнить букмекерской конторы { selItem?.name }</p>
            <div className="ad d-flex g10">
                <img src={gift} alt="icon"/>
                <div>
                    <p className='desc'>Получите бонус 10 000 000 сум на свой первый депозит!</p>
                    <button
                        className="promo row align-center"
                        onClick={() => {
                            navigator.clipboard.writeText('LimonPay')
                                .then(() => toast.success('Промокод скопирован!'))
                                .catch(() => toast.error('Ошибка при копировании'));
                        }}
                    >
                        <span>Промокод: LimonPay</span>
                        <i className="fa-solid fa-copy"/>
                    </button>
                </div>
            </div>
            <Form
                onFinish={onFormSubmit}
                layout='vertical'
                validateMessages={validateMessages}
                form={form}
            >
                <Form.Item
                    name='id'
                    label='Введите ID'
                    rules={[{ required: true }]}
                >
                    <Input placeholder='Ваше ID...' />
                </Form.Item>

                {check !== null && (
                    <p className='player'>{ check }</p>
                )}

                <Form.Item
                    name='amount'
                    label='Сумма'
                    rules={[{ required: true }]}
                >
                    <Input placeholder='Сумма оплаты' type='tel' />
                </Form.Item>
                <div className='balance row between align-center'>
                    <span className='txt'>Ваш баланс</span>
                    <span className='price'>{ formatPrice(me?.amount || 0) } uzs</span>
                </div>
                <div className="btns grid">
                    <Button className='btn' htmlType='button' onClick={() => setSelItem(null)}>Закрыть</Button>
                    <Button className='btn submit' htmlType='submit' loading={mutation?.isPending}>Пополнить</Button>
                </div>
            </Form>
        </Modal>
    );
};

export default SelectedModal;