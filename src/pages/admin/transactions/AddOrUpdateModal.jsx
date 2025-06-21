import React, {useEffect, useMemo, useState} from 'react';
import {Button, Form, Input, Modal, Select} from "antd";
import {validateMessages} from "../../../assets/scripts/global.js";
import {useMutation, useQuery} from "@tanstack/react-query";
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

// debounce search
function debounce(func, wait) {
    let timeout
    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), wait)
    }
}


const AddOrUpdateModal = ({ modal, setModal, selectedItem, setSelectedItem, refetch }) => {

    const [form] = Form.useForm()


    // mutate
    const muEdit = useMutation({
        mutationFn: fetchEdit,
        onSuccess: (res) => {
            toast.success(res.message)

            setModal('close')
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

            setModal('close')
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


    // search
    const [_, setSearchTerm] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const debouncedSearch = useMemo(() => debounce((val) => {
        if (val.length >= 3) setSearchQuery(val)
    }, 400), [])

    const fetchUsers = async ({ queryKey }) => {
        const [_key, q] = queryKey

        const params = q && q.length >= 3
            ? { q }
            : {}; // hech narsa bermasa, umumiy ro‘yxat

        const { data } = await $adminResp.get('/user/all-users?is_system_user=true&page=1&limit=20', { params })
        return data
    }

    const handleSearch = (val) => {
        setSearchTerm(val);
        if (!val) {
            setSearchQuery(''); // tozalanganda umumiy userlar ko‘rsatiladi
        } else {
            debouncedSearch(val);
        }
    }

    const { data: user, isFetching } = useQuery({
        queryKey: ['users', searchQuery],
        queryFn: fetchUsers,
        enabled: modal === 'deposit' || modal === 'withdraw', // faqat 3 harfdan keyin ishga tushadi
        keepPreviousData: true
    })


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
                                    showSearch
                                    size="large"
                                    placeholder="Foydalanuvchini tanlang"
                                    notFoundContent={isFetching ? 'Yuklanmoqda...' : 'Topilmadi'}
                                    onSearch={handleSearch}
                                    filterOption={false}
                                    options={user?.data?.map(i => ({
                                        label: `${i.first_name} ${i?.last_name} - ${i.id}`,
                                        value: i.id,
                                    }))}
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