import React, {useEffect, useState} from 'react';
import Title from "../../../components/admin/title/Title.jsx";
import {Button, Form, Input, Modal, Table} from "antd";
import {formatPrice, validateMessages} from "../../../assets/scripts/global.js";
import {useMutation, useQuery} from "@tanstack/react-query";
import {tableCols} from "../../../components/admin/table/columns.js";
import Actions from "../../../components/admin/table/Actions.jsx";
import {$adminResp} from "../../../api/config.js";
import {toast} from "react-hot-toast";


// fetches
const fetchData = async () => {
    const { data } = await $adminResp.get('/static-options')
    return data
}
const fetchEdit = async (body) => {
    const { data } = await $adminResp.put('/static-options/update', body)
    return data
}


const StaticOption = () => {

    const [form] = Form.useForm()

    const [modal, setModal] = useState('close')
    const [selectedItem, setSelectedItem] = useState(null)


    const { data, refetch, isLoading } = useQuery({
        queryKey: ['static-options'],
        queryFn: fetchData,
        keepPreviousData: true,
    })


    // add card
    const mutation = useMutation({
        mutationFn: fetchEdit,
        onSuccess: () => {
            setModal('close')
            refetch()
        },
        onError: (err) => {
            toast.error(`Ошибка: ${err.response?.data?.message || err.message}`)
        }
    })

    const onFormSubmit = (values) => {
        mutation.mutate(values)
    }


    // form
    useEffect(() => {
        if (selectedItem) {
            form.setFieldsValue(selectedItem)
        } else {
            form.resetFields()
        }
    }, [form, selectedItem])


    // table
    const columns = [
        {
            title: '№',
            width: 70,
            dataIndex: 'index',
            key: 'index',
            render: (_, __, index) => (
                <span>{ index + 1 }</span>
            )
        },
        {
            title: 'Key',
            dataIndex: 'key',
            key: 'key'
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            render: (_, i) => (
                <span>{ formatPrice(i.value || 0) } сум</span>
            )
        },
        {
            title: 'Description',
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            ...tableCols.actions,
            render: (_, i) => <Actions
                setModal={setModal}
                setSelectedItem={setSelectedItem}
                i={i}
            />
        },
    ]


    // form fields
    const fields = [
        { name: 'key', label: 'Key', type: 'text', required: true, disabled: true },
        { name: 'value', label: 'Value', type: 'number', required: true },
    ]


    return (
        <div className="other page">
            <div className="container">
                <Title
                    title="Стат параметры"
                    setModal={setModal}
                    btn
                />
                <div className="content">
                    <Table
                        columns={columns}
                        dataSource={data?.list}
                        pagination={false}
                        loading={isLoading}
                        scroll={{x: 750}}
                    />
                </div>
            </div>
            <Modal
                rootClassName='admin-modal'
                className='main-modal'
                title="O'zgartirish"
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
                    {fields.map((item) => (
                        <Form.Item
                            key={item.name}
                            name={item.name}
                            label={item.label}
                            rules={[{ required: item.required }]}
                        >
                            <Input
                                placeholder={item.label}
                                type={item.type}
                                disabled={item.disabled}
                            />
                        </Form.Item>
                    ))}

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
        </div>
    );
};

export default StaticOption