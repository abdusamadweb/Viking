import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Input} from "antd";
import {formatPhone} from "../../assets/scripts/global.js";

const RegisterSms = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const query = new URLSearchParams(location.search)
    const phone = query.get('phone')
    const smsId = query.get('smsId')


    return (
        <div className='auth sms'>
            <div className="container">
                <div className="sms__head row align-center g1">
                    <button className='navigate' onClick={() => navigate(-1)}>
                        <i className="fa-solid fa-circle-chevron-left"/>
                    </button>
                    <span className='title'>Подтверждения</span>
                </div>
                <div className="sms__body">
                    <p className="phone">{ formatPhone(phone) }</p>
                    <p className="desc">
                        На ваш Telegram-аккаунт, привязанный к этому номеру,
                        был отправлен 6-значный код. Пожалуйста, введите этот код.
                    </p>
                    <Input.OTP
                        length={6}
                    />
                    <div className="btns">
                        <button className="btn submit">
                            Подтвердить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterSms;