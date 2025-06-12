import React from 'react';
import {Button, Form, Input, Modal} from "antd";
import {formatPrice, validateMessages} from "../../../assets/scripts/global.js";
import {$resp} from "../../../api/config.js";
import {toast} from "react-hot-toast";
import {useMutation} from "@tanstack/react-query";
import {Tr, trans} from "../../../components/translator/Tr.js";


// fetch
const deposit = async (body) => {
    const { data } = await $resp.post("/transaction/deposit/create", body)
    return data
}


const DepositModal = ({ modal, setModal, setActiveTimer, setDrawerCard }) => {

    const [form] = Form.useForm()

    const me = JSON.parse(localStorage.getItem('me'))


    // mutate
    const mutation = useMutation({
        mutationFn: deposit,
        onSuccess: (res) => {
            toast.success(res.message)

            setDrawerCard(res.data)

            setModal('drawer')
            setActiveTimer(true)
        },
        onError: (err) => {
            toast.error(`Ошибка: ${err.response?.data?.message || err.message}`)
        }
    })

    const onFormSubmit = (val) => {
        mutation.mutate(val)
    }


    return (
        <Modal
            rootClassName='main-modal'
            className='deposit-modal'
            open={modal === 'deposit'}
            onCancel={() => setModal('close')}
            centered
            closeIcon={false}
        >
            <p className="title"><Tr val={'На какую сумму хотите пополнить баланс?'} /></p>

            <Form
                onFinish={onFormSubmit}
                layout='vertical'
                validateMessages={validateMessages}
                form={form}
            >
                <Form.Item
                    name='amount'
                    label={trans('Сумма')}
                    rules={[{ required: true }]}
                >
                    <Input placeholder={trans('Сумма оплаты')} type="tel"
                           inputMode="numeric"
                           pattern="[0-9]*" />
                </Form.Item>
                <div className='balance row between align-center'>
                    <span className='txt'><Tr val={'Ваш баланс'} /></span>
                    <span className='price'>{ formatPrice(me?.amount | 0) } uzs</span>
                </div>
                <div className="btns grid">
                    <Button className='btn' htmlType='button' onClick={() => setModal('close')}><Tr val={'Закрыть'} /></Button>
                    <Button
                        className='btn submit'
                        htmlType='submit'
                        loading={mutation.isPending}
                    >
                        <Tr val={'Пополнить'} />
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default DepositModal;