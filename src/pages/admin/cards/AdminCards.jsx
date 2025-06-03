import React, {useEffect, useState} from 'react';
import Title from "../../../components/admin/title/Title.jsx";
import {Button, Form, Input, Modal, Pagination, Table} from "antd";
import {formatCard, formatPrice, validateMessages} from "../../../assets/scripts/global.js";
import {addOrEdit, deleteData} from "../../../api/crud.js";
import {useQuery} from "@tanstack/react-query";
import {tableCols} from "../../../components/admin/table/columns.js";
import Actions from "../../../components/admin/table/Actions.jsx";
import {useCrud} from "../../../hooks/useCrud.jsx";
import {$adminResp} from "../../../api/config.js";


// fetches
const fetchData = async (body) => {
    const { data } = await $adminResp.get(`/card/all?page=${body.page}&limit=${body.limit}`, body)
    return data
}


const AdminCards = () => {

    const [form] = Form.useForm()

    const [modal, setModal] = useState('close')
    const [selectedItem, setSelectedItem] = useState(null)


    // filter data
    const [body, setBody] = useState({
        page: 1,
        limit: 30,
    })

    const { data, refetch, isLoading } = useQuery({
        queryKey: ['admin-cards', JSON.stringify(body)],
        queryFn: () => fetchData(body),
        keepPreviousData: true,
    })


    // add & edit
    const {
        addOrEditMutation,
        deleteMutation
    } = useCrud('edu-form', {
        refetch,
        form,
        setModal,
        setSelectedItem,
        addOrEdit,
        deleteData
    })

    const onFormSubmit = (values) => {
        const body = {
            ...values,
        }

        addOrEditMutation.mutate({
            values: body,
            selectedItem
        })
    }

    const deleteItem = (id) => {
        deleteMutation.mutate(id)
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
        tableCols.id,
        tableCols.name,
        {
            title: 'Номер карты',
            dataIndex: 'number',
            key: 'number',
            render: (_, i) => (
                <span>{ formatCard(i.number) }</span>
            )
        },
        {
            title: 'Лимит',
            dataIndex: 'limit',
            key: 'limit',
            render: (_, i) => (
                <span>{ formatPrice(i.limit || 0) } сум</span>
            )
        },
        {
            ...tableCols.actions,
            render: (_, i) => <Actions
                setModal={setModal}
                setSelectedItem={setSelectedItem}
                deleteItem={deleteItem}
                i={i}
            />
        },
    ]


    // form fields
    const fields = [
        { name: 'name_uz', label: 'Nomi - uz', type: 'text', required: true },
        { name: 'name_ru', label: 'Nomi - ru', type: 'text', required: true },
        { name: 'name_en', label: 'Nomi - en', type: 'text', required: true },
    ]


    return (
        <div className="other page">
            <div className="container">
                <Title
                    title="Ta'lim shakli"
                    setModal={setModal}
                    btn
                />
                <div className="content">
                    <Table
                        columns={columns}
                        dataSource={data?.data}
                        pagination={false}
                        loading={isLoading}
                        scroll={{x: 750}}
                    />
                    <Pagination
                        align='end'
                        current={data?.page}
                        total={data?.total}
                        pageSize={body.limit}
                        onChange={(page, pageSize) => {
                            setBody(prev => ({
                                ...prev,
                                page: page,
                                limit: pageSize,
                            }))
                            window.scrollTo(0, 0)
                        }}
                    />
                </div>
            </div>
            <Modal
                rootClassName='admin-modal'
                className='main-modal'
                title={modal === 'add' ? "Qo'shish" : "O'zgartirish"}
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
                            />
                        </Form.Item>
                    ))}

                    <div className='end mt1'>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size='large'
                            loading={addOrEditMutation?.isPending}
                        >
                            Tasdiqlash
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminCards