import React, {useRef} from 'react';
import {Button, Drawer, Form, Input, Radio} from "antd";
import {validateMessages} from "../../../assets/scripts/global.js";
import {IMaskInput} from "react-imask";
import card from '../../../assets/images/card-icon.svg'
import humo from '../../../assets/images/humo-icon.svg'
import uzcard from '../../../assets/images/uzcard-icon.svg'

const AddDrawer = ({ modal, setModal }) => {

    const inputRef = useRef(null)


    return (
        <Drawer
            rootClassName='main-modal main-drawer header-drawer'
            className='card-add-drawer'
            placement='bottom'
            closable={false}
            onClose={() => setModal('close')}
            open={modal === 'add' || modal === 'edit'}
            key='bottom'
        >
            <span className="line"/>
            <p className="title">
                { modal === 'add' ? 'Добавление карты' : 'Редактирование карты' }
            </p>
            <Form
                // onFinish={onFormSubmit}
                layout='vertical'
                validateMessages={validateMessages}
                // form={form}
            >
                <div className="card-form">
                    <Form.Item
                        name='name'
                        label='Название карты'
                        rules={[{ required: true, message: '' }]}
                    >
                        <Input placeholder='Введите название'/>
                    </Form.Item>
                    <Form.Item
                        name='card'
                        label='Номер карты'
                        rules={[{ required: true, message: '' }]}
                    >
                        <IMaskInput
                            className='inp-mask'
                            mask='0000 0000 0000 0000'
                            unmask={false}
                            inputRef={inputRef}
                            lazy={false}
                            placeholder='0000 - 0000 - 0000 - 0000'
                        />
                    </Form.Item>
                </div>
                <div className="choose">
                    <p className="choose__title">Выберите иконки</p>
                    <Form.Item
                        name='card_img'
                        rules={[{ required: true, message: '' }]}
                    >
                        <Radio.Group
                            options={[
                                {
                                    label: <div className='imgs'>
                                        <img src={card} alt="card"/>
                                    </div>,
                                    value: 'card',
                                },
                                {
                                    label: <div className='imgs'>
                                        <img src={humo} alt="card"/>
                                    </div>,
                                    value: 'humo',
                                },
                                {
                                    label: <div className='imgs'>
                                        <img src={uzcard} alt="card"/>
                                    </div>,
                                    value: 'uzcard',
                                },
                            ]}
                            optionType="button"
                            buttonStyle="solid"
                        />
                    </Form.Item>
                </div>
                <div className="btns">
                    <Button className='btn submit' htmlType='submit'>Сохранить</Button>
                </div>
            </Form>
        </Drawer>
    );
};

export default AddDrawer;