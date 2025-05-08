import React, {useState} from 'react';
import {Button, Form, Input, Modal} from "antd";
import {validateMessages} from "../../../assets/scripts/global.js";

const DepositModal = ({ modal, setModal }) => {

    const [form] = Form.useForm()

    const [loading, setLoading] = useState(false)

    const onFormSubmit = (val) => {
        console.log(val)

        setLoading(true)

        setTimeout(() => {
            setLoading(false)
            setModal('drawer')
        }, 1000)
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
            <p className="title">На какую сумму хотите пополнить баланс?</p>

            <Form
                onFinish={onFormSubmit}
                layout='vertical'
                validateMessages={validateMessages}
                form={form}
            >
                <Form.Item
                    name='price'
                    label='Сумма'
                    rules={[{ required: true }]}
                >
                    <Input placeholder='Сумма оплаты' type='tel' />
                </Form.Item>
                <div className='balance row between align-center'>
                    <span className='txt'>Ваш баланс</span>
                    <span className='price'>10 000 000 uzs</span>
                </div>
                <div className="btns grid">
                    <Button className='btn' htmlType='button' onClick={() => setModal('close')}>Закрыть</Button>
                    <Button
                        className='btn submit'
                        htmlType='submit'
                        loading={loading}
                    >
                        Пополнить
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default DepositModal;