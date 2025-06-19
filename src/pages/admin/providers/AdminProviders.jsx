import React, {useEffect, useState} from 'react';
import Title from "../../../components/admin/title/Title.jsx";
import {Button, Form, Input, Modal, Pagination, Table, Upload} from "antd";
import {formatPrice, uploadProps, validateMessages} from "../../../assets/scripts/global.js";
import {addOrEdit, deleteData} from "../../../api/crud.js";
import {useQuery} from "@tanstack/react-query";
import {tableCols} from "../../../components/admin/table/columns.js";
import Actions from "../../../components/admin/table/Actions.jsx";
import {useCrud} from "../../../hooks/useCrud.jsx";
import {$adminResp} from "../../../api/config.js";
import GetFile from "../../../components/get-file/GetFile.jsx";


// fetches
const fetchData = async (body) => {
    const { data } = await $adminResp.get(`/provider/all?page=${body.page}&limit=${body.limit}`, body)
    return data
}


const AdminProviders = () => {

    const [form] = Form.useForm()

    const [modal, setModal] = useState('close')
    const [selectedItem, setSelectedItem] = useState(null)

    const [file, setFile] = useState(null)


    // filter data
    const [body, setBody] = useState({
        page: 1,
        limit: 30,
    })

    const { data, refetch, isLoading } = useQuery({
        queryKey: ['admin-providers', JSON.stringify(body)],
        queryFn: () => fetchData(body),
        keepPreviousData: true,
    })


    // add & edit
    const {
        addOrEditMutation,
        deleteMutation
    } = useCrud('provider', {
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
            logo_id: file ? file?.file.response.files[0].id : selectedItem?.logo_id,
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
        {
            title: 'Имя карты',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Мин лимит',
            dataIndex: 'min_amount',
            key: 'min_amount',
            render: (_, i) => (
                <span>{ formatPrice(i.min_amount || 0) } сум</span>
            )
        },
        {
            title: 'Макс лимит',
            dataIndex: 'max_amount',
            key: 'max_amount',
            render: (_, i) => (
                <span>{ formatPrice(i.max_amount || 0) } сум</span>
            )
        },
        {
            title: 'Лого',
            dataIndex: 'logo_id',
            key: 'logo_id',
            render: (_, i) => (
                <GetFile className='logo-img' id={i.logo_id} />
            )
        },
        {
            title: 'Логин',
            dataIndex: 'login',
            key: 'login'
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
        { name: 'name', label: 'Имя провайдера', type: 'text', required: true },
        { name: 'min_amount', label: 'Мин лимит', type: 'number', required: true },
        { name: 'max_amount', label: 'Макс лимит', type: 'number', required: true },
        { name: 'login', label: 'Логин', type: 'text', required: true },
        { name: 'hash', label: 'Hash', type: 'text', required: true },
        { name: 'api', label: 'Api', type: 'text', required: true },
        { name: 'cashierpass', label: 'Cashierpass', type: 'text', required: true },
        { name: 'cashdeskid', label: 'Cashdeskid', type: 'number', required: true },
    ]


    return (
        <div className="other page">
            <div className="container">
                <Title
                    title="Провайдеры"
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
                    <Form.Item
                        className='upload'
                        name='logo_id'
                        label='Foto'
                        rules={[{required: true, message: ''}]}
                    >
                        <Upload
                            {...uploadProps}
                            headers={{
                                Authorization: `Bearer ${localStorage.getItem('admin-token')}`
                            }}
                            onChange={(e) => setFile(e)}
                            listType="text"
                        >
                            <Input
                                rootClassName={file?.file.percent !== null && 'change-icon'}
                                size='large'
                                suffix={<i className="fa-solid fa-upload"/>}
                                prefix={file ? file?.file.percent?.toFixed(1) + '%' : 'Yuklash'}
                            />
                        </Upload>
                    </Form.Item>

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

export default AdminProviders