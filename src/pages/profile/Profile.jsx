import './Profile.scss'
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import user from '../../assets/images/profile.png'
import {validateMessages} from "../../assets/scripts/global.js";
import {Button, DatePicker, Form, Input} from "antd";
import {useMutation, useQuery} from "@tanstack/react-query";
import {$resp} from "../../api/config.js";
import {toast} from "react-hot-toast";


// fetch
const fetchMe = async () => {
    const { data } = await $resp.post("/user/me")
    return data
}

const updateProfile = async (body) => {
    const { data } = await $resp.post("/user/update-profile", body)
    return data
}


const Profile = () => {

    const [form] = Form.useForm()
    const navigate = useNavigate()

    const [file, setFile] = useState(null)


    // fetch
    const { data: me } = useQuery({
        queryKey: ['me'],
        queryFn: fetchMe,
        keepPreviousData: true,
    })
    useEffect(() => {
        if (me) localStorage.setItem('me', JSON.stringify(me?.data))
    }, [me])


    // mutate
    const muUpdate = useMutation({
        mutationFn: updateProfile,
        onSuccess: (res) => {
            toast.success(res.message)
        },
        onError: (err) => {
            toast.error(`Ошибка: ${err.response?.data?.message || err.message}`)
        }
    })


    // submit form
    const onFormSubmit = (values) => {
        const body = {
            ...values,
            file_id: file ? file?.file.response.files[0].id : me?.data?.logo_id,
        }

        muUpdate.mutate(body)
    }


    // form
    useEffect(() => {
        if (me) {
            form.setFieldsValue(me?.data)
        } else {
            form.resetFields()
        }
    }, [form, me])


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
                        onFinish={onFormSubmit}
                        layout='vertical'
                        validateMessages={validateMessages}
                        form={form}
                    >
                        <div className="imgs">
                            <img className='img' src={user} alt="image"/>
                            <button className='upload-btn'>
                                <i className="fa-solid fa-pen"/>
                            </button>
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
                        <Form.Item
                            name='birth_date'
                            label='Дата рождение'
                            rules={[{required: true}]}
                        >
                            <DatePicker size='large' placeholder='Дата рождение' />
                        </Form.Item>

                        <Button className='btn'>Сохранить</Button>
                    </Form>

                </div>
            </div>
        </div>
    );
};

export default Profile;