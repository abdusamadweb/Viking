import './Profile.scss'
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {uploadProps, validateMessages} from "../../assets/scripts/global.js";
import {Button, DatePicker, Form, Input, Upload} from "antd";
import {useMutation, useQuery} from "@tanstack/react-query";
import {$resp} from "../../api/config.js";
import {toast} from "react-hot-toast";
import profile from "../../assets/images/profile-def.png";
import GetFile from "../../components/get-file/GetFile.jsx";
import dayjs from 'dayjs'


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
    const { data, refetch: refetchMe } = useQuery({
        queryKey: ['me'],
        queryFn: fetchMe,
        keepPreviousData: true,
    })
    useEffect(() => {
        if (data) localStorage.setItem('me', JSON.stringify(data?.data))
    }, [data])
    const me = data?.data


    // mutate
    const muUpdate = useMutation({
        mutationFn: updateProfile,
        onSuccess: (res) => {
            toast.success(res.message)
            
            refetchMe()
        },
        onError: (err) => {
            toast.error(`Ошибка: ${err.response?.data?.message || err.message}`)
        }
    })


    // submit form
    const onFormSubmit = (values) => {
        const body = {
            ...values,
            logo_id: file ? file?.file.response.files[0].id : me?.logo_id,
            birthday: values.birthday.format('YYYY-MM-DD')
        }

        muUpdate.mutate(body)
    }


    // form
    useEffect(() => {
        if (me) {
            const initial = {
                ...me,
                birthday: me.birthday ? dayjs(me.birthday) : null
            }
            form.setFieldsValue(initial)
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
                            <GetFile className='img' id={file ? file?.file?.response?.files?.[0]?.id : me?.logo_id} defImg={profile} />
                            <Upload
                                className='upload'
                                {...uploadProps}
                                onChange={(e) => setFile(e)}
                                listType='text'
                            >
                                <button className='upload-btn'>
                                    <i className="fa-solid fa-pen"/>
                                </button>
                            </Upload>
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
                            name='birthday'
                            label='Дата рождение'
                            rules={[{required: true}]}
                        >
                            <DatePicker size='large' placeholder='Дата рождение' />
                        </Form.Item>

                        <Button className='btn' htmlType='submit' loading={muUpdate.isPending}>Сохранить</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Profile;