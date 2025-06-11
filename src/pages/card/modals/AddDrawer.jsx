import React, {useEffect} from 'react';
import {Button, Drawer, Form, Input, Radio} from "antd";
import {validateMessages} from "../../../assets/scripts/global.js";
import {IMaskInput} from "react-imask";
import card from '../../../assets/images/card-icon.svg'
import humo from '../../../assets/images/humo-icon.svg'
import uzcard from '../../../assets/images/uzcard-icon.svg'
import {addOrEditUser} from "../../../api/crud.js";
import {useMutation} from "@tanstack/react-query";
import {toast} from "react-hot-toast";
import {Tr, trans} from "../../../components/translator/Tr.js";

const AddDrawer = ({ modal, setModal, selItem, setSelItem, refetch }) => {

    const [form] = Form.useForm()


    // add & edit
    const addOrEditMutation = useMutation({
        mutationFn: ({ values, selItem }) => {
            return addOrEditUser(
                'user-card',
                { ...values },
                selItem?.id || false
            )
        },
        onSuccess: async () => {
            await refetch()

            toast.success('Qoshildi!')

            setModal('close')
            setSelItem(null)
            form.resetFields()
        },
        onError: (err) => {
            toast.error(`Ошибка: ${err.response?.data?.message || err.message}`)
        }
    })

    const onFormSubmit = (values) => {
        const body = {
            ...values,
            number: values.number.replace(/\s+/g, '')
        }

        addOrEditMutation.mutate({
            values: body,
            selItem
        })
    }


    // form
    useEffect(() => {
        if (selItem) {
            form.setFieldsValue(selItem)
        } else {
            form.resetFields()
        }
    }, [form, selItem])


    return (
        <Drawer
            rootClassName='main-modal main-drawer header-drawer'
            className='card-add-drawer'
            placement='bottom'
            closable={false}
            onClose={() => {
                setSelItem(null)
                setModal('close')
            }}
            open={modal === 'add' || modal === 'edit'}
            key='bottom'
            height={454}
        >
            <span className="line"/>
            <p className="title">
                { modal === 'add' ? trans('Добавление карты') : trans('Редактирование карты') }
            </p>
            <Form
                onFinish={onFormSubmit}
                layout='vertical'
                validateMessages={validateMessages}
                form={form}
            >
                <div className="card-form">
                    <Form.Item
                        name='name'
                        label={trans('Название карты')}
                        rules={[{ required: true, message: '' }]}
                    >
                        <Input placeholder={trans('Введите название')}/>
                    </Form.Item>
                    <Form.Item
                        name='number'
                        label={trans('Номер карты')}
                        rules={[{ required: true, message: '' }]}
                    >
                        <IMaskInput
                            className='inp-mask'
                            mask='0000 0000 0000 0000'
                            placeholder='0000 - 0000 - 0000 - 0000'
                        />
                    </Form.Item>
                </div>
                <div className="choose">
                    <p className="choose__title"><Tr val='Выберите иконки' /></p>
                    <Form.Item
                        name='card_img'
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
                    <Button
                        className='btn submit'
                        htmlType='submit'
                        loading={addOrEditMutation?.isPending}
                    >
                        <Tr val='Сохранить' />
                    </Button>
                </div>
            </Form>
        </Drawer>
    );
};

export default AddDrawer;