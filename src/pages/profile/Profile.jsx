import './Profile.scss'
import React from 'react';
import {useNavigate} from "react-router-dom";
import user from '../../assets/images/profile.png'
import {validateMessages} from "../../assets/scripts/global.js";
import {Button, Form, Input} from "antd";

const Profile = () => {

    const [form] = Form.useForm()
    const navigate = useNavigate()


    return (
        <div className='profile page'>
            <div className="container">
                <div className="profile__head">
                    <div className="titles row align-center g1">
                        <button className='back' onClick={() => navigate(-1)}>
                            <i className="fa-solid fa-circle-chevron-left"/>
                        </button>
                        <span>Профиль</span>
                    </div>
                </div>
                <div className="profile__body">
                    <Form
                        // onFinish={onFormSubmit}
                        layout='vertical'
                        validateMessages={validateMessages}
                        form={form}
                    >
                        <div className="imgs">
                            <img className='img' src={user} alt="image"/>
                        </div>

                        <Form.Item
                            name='first_name'
                            label='Имя'
                            rules={[{required: true}]}
                        >
                            <Input placeholder='Имя...'/>
                        </Form.Item>
                        <Form.Item
                            name='last_name'
                            label='Фамилия'
                            rules={[{required: true}]}
                        >
                            <Input placeholder='Фамилия...'/>
                        </Form.Item>

                        <Button className='btn'>Сохранить</Button>
                    </Form>

                </div>
            </div>
        </div>
    );
};

export default Profile;