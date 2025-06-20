import React, {useEffect} from 'react';
import {Button, Form, Input, Modal, Select} from "antd";
import {validateMessages} from "../../../assets/scripts/global.js";
import {useMutation} from "@tanstack/react-query";
import {toast} from "react-hot-toast";
import {$adminResp} from "../../../api/config.js";


// fetch
const fetchEdit = async (body) => {
    const { data } = await $adminResp.post('/transaction/update-transaction', body)
    return data
}
const fetchAdd = async (body) => {
    const { data } = await $adminResp.post('/transaction/deposit/manual', body)
    return data
}


const AddOrUpdateModal = ({ modal, setModal, selectedItem, setSelectedItem, refetch }) => {

    const [form] = Form.useForm()


    // mutate
    const muEdit = useMutation({
        mutationFn: fetchEdit,
        onSuccess: (res) => {
            toast.success(res.message)

            refetch()
        },
        onError: (err) => {
            toast.error(`Ошибка: ${err.response?.data?.message || err.message}`)
        }
    })

    const muAdd = useMutation({
        mutationFn: fetchAdd,
        onSuccess: (res) => {
            toast.success(res.message)

            refetch()
        },
        onError: (err) => {
            toast.error(`Ошибка: ${err.response?.data?.message || err.message}`)
        }
    })

    const onFormSubmit = (values) => {
        const edit = {
            ...values,
            trans_id: selectedItem?.id,
        }
        const add = {
            ...values,
            type: modal === 'deposit' ? 'in' : 'out'
        }

        if (modal === 'edit') {
            muEdit.mutate(edit)
        } else {
            muAdd.mutate(add)
        }
    }


    // form
    useEffect(() => {
        if (selectedItem) {
            form.setFieldsValue(selectedItem)
        } else {
            form.resetFields()
        }
    }, [form, selectedItem])


    return (
        <Modal
            rootClassName='admin-modal'
            className='main-modal'
            title={modal !== 'edit' ? "Qo'shish" : "O'zgartirish"}
            open={modal !== 'close'}
            onCancel={() => {
                setModal('close')
                setSelectedItem(null)
            }}
        >
            <Form
                onFinish={onFormSubmit}
                layout='vertical'
                validateMessages={validateMessages}
                form={form}
            >
                {
                    modal === 'edit' ?
                        <>
                            <Form.Item
                                name='status'
                                label='Status'
                                rules={[{ required: true, message: '' }]}
                            >
                                <Select
                                    size='large'
                                    placeholder="Status"
                                    options={[
                                        {
                                            label: 'reject',
                                            value: 'reject',
                                        },
                                        {
                                            label: 'accept',
                                            value: 'accept',
                                        }
                                    ]}
                                />
                            </Form.Item>
                        </>
                        :
                        <>
                            <Form.Item
                                name='user_id'
                                label='User'
                                rules={[{ required: true, message: '' }]}
                            >
                                <Select
                                    size='large'
                                    placeholder="User"
                                    options={[
                                        {
                                            label: 'reject',
                                            value: 'reject',
                                        },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item
                                name='amount'
                                label='Amount'
                                rules={[{ required: true, message: '' }]}
                            >
                                <Input
                                    placeholder='Amount'
                                    type="tel"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                />
                            </Form.Item>
                            <Form.Item
                                name='description'
                                label='Description'
                                rules={[{ required: true, message: '' }]}
                            >
                                <Input.TextArea
                                    placeholder='Description'
                                    type="text"
                                />
                            </Form.Item>
                        </>
                }

                <div className='end mt1'>
                    <Button
                        type="primary"
                        htmlType="submit"
                        size='large'
                        // loading={addOrEditMutation?.isPending}
                    >
                        Tasdiqlash
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default AddOrUpdateModal;