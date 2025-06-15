import './Auth.scss'
import React from 'react';
import {Button, Form, Input} from "antd";
import {validateMessages} from "../../assets/scripts/global.js";
import logo from '../../assets/images/login-logo.svg'
import logoLight from '../../assets/images/login-logo-light.svg'
import {PhoneInput} from "../../components/inputs/Inputs.jsx";
import {useNavigate} from "react-router-dom";
import {$resp} from "../../api/config.js";
import {toast} from "react-hot-toast";
import {useMutation} from "@tanstack/react-query";
import {useTheme} from "../../context/ThemeContext.jsx";


// fetch
const auth = async (body) => {
    const { data } = await $resp.post("/auth/register", body)
    return data
}


const Register = () => {

    const { theme: themeL } = useTheme()

    const navigate = useNavigate()
    const [form] = Form.useForm()


    // mutate
    const mutation = useMutation({
        mutationFn: auth,
        onSuccess: (res) => {
            toast.success(res.message)

            localStorage.setItem("token", res.token)

            const phone = '+998' + form.getFieldValue('phone')
            const smsId = res.data?.sms_id

            setTimeout(() => navigate(`/register/sms?phone=${phone}&smsId=${smsId}`), 500)
        },
        onError: (err) => {
            toast.error(`Ошибка: ${err.response?.data?.message || err.message}`)
        }
    })

    const onFormSubmit = (val) => {
        const body = {
            password: val.password,
            phone: '+998' + val.username,
        }

        mutation.mutate(body)
    }


    return (
        <div className='auth'>
            <div className="container">
                <div className="auth__inner">
                    <div className="auth__titles">
                        <img className='logo' src={themeL === 'dark' ? logo : logoLight} alt="logo"/>
                        <p className="title">Зарегистрироваться</p>
                    </div>
                    <Form
                        onFinish={onFormSubmit}
                        layout='vertical'
                        validateMessages={validateMessages}
                        form={form}
                    >
                        <Form.Item
                            name='username'
                            label='Номер телефона'
                            rules={[{required: true, message: ''}]}
                        >
                            <PhoneInput />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            label='Пароль'
                            rules={[{required: true, message: ''}]}
                        >
                            <Input.Password placeholder='***********' />
                        </Form.Item>
                        <Form.Item
                            name="re-password"
                            label='Подтвердите пароль'
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Подтвердите пароль' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject(new Error('Пароли несовместимы'))
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder='***********' />
                        </Form.Item>
                        <div className="btns">
                            <Button
                                className='btn submit'
                                htmlType='submit'
                                loading={mutation.isPending}
                            >
                                <span>Зарегистрироваться</span>
                                <i className="fa-solid fa-arrow-right-long"/>
                            </Button>
                            <button className='btn' onClick={() => navigate('/login')}>Войти</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Register;