import React from 'react';
import img from "../../../assets/images/swap1.png";
import gift from "../../../assets/images/gift.svg";
import {Button, Form, Input, Modal} from "antd";
import {validateMessages} from "../../../assets/scripts/global.js";

const SelectedModal = ({ selItem, setSelItem }) => {

    const [form] = Form.useForm()

    const onFormSubmit = (val) => {
        console.log(val)
    }


    return (
        <Modal
            rootClassName='main-modal'
            className='selected-modal'
            open={selItem}
            onCancel={() => setSelItem(null)}
            centered
        >
            <img className='img' src={img} alt="image"/>
            <p className="title">Пополнить букмекерской конторы 1xbet</p>
            <div className="ad d-flex g10">
                <img src={gift} alt="icon"/>
                <div>
                    <p className='desc'>Получите бонус 10 000 000 сум на свой первый депозит!</p>
                    <div className="promo row align-center g10">
                        <span>Промокод: LimonPay</span>
                        <i className="fa-solid fa-copy"/>
                    </div>
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
                    <Button className='btn' htmlType='button'>Закрыть</Button>
                    <Button className='btn submit' htmlType='submit'>Пополнить</Button>
                </div>
            </Form>
        </Modal>
    );
};

export default SelectedModal;