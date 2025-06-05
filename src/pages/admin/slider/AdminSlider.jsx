import React, {useEffect, useState} from 'react';
import Title from "../../../components/admin/title/Title.jsx";
import {Button, Form, Input, Modal, Pagination, Table, Upload} from "antd";
import {formatCard, formatPrice, uploadProps, validateMessages} from "../../../assets/scripts/global.js";
import {addOrEdit, deleteData} from "../../../api/crud.js";
import {useQuery} from "@tanstack/react-query";
import {tableCols} from "../../../components/admin/table/columns.js";
import Actions from "../../../components/admin/table/Actions.jsx";
import {useCrud} from "../../../hooks/useCrud.jsx";
import {$adminResp} from "../../../api/config.js";
import GetFile from "../../../components/get-file/GetFile.jsx";


// fetches
const fetchData = async (body) => {
    const { data } = await $adminResp.get(`/slider/all?page=${body.page}&limit=${body.limit}`, body)
    return data
}


const AdminSlider = () => {

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
        queryKey: ['admin-slider', JSON.stringify(body)],
        queryFn: () => fetchData(body),
        keepPreviousData: true,
    })


    // add & edit
    const {
        addOrEditMutation,
        deleteMutation
    } = useCrud('slider', {
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
            photo_id: file ? file?.file.response.files[0].id : selectedItem?.photo_id,
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
            title: 'Link',
            dataIndex: 'link',
            key: 'link',
            render: (_, i) => (
                <a href={i.link} target='_blank'>{ i.link }</a>
            )
        },
        {
            title: 'Index',
            dataIndex: 'order_index',
            key: 'order_index'
        },
        {
            title: 'Image',
            dataIndex: 'photo_id',
            key: 'photo_id',
            render: (_, i) => (
                <GetFile className='logo-img' id={i.photo_id} />
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
        { name: 'link', label: 'Link', type: 'text', required: true },
        { name: 'order_index', label: 'Index', type: 'number', required: true },
    ]


    return (
        <div className="other page">
            <div className="container">
                <Title
                    title="Слайдер"
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
                        name='photo_id'
                        label='Passport fayl'
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

export default AdminSlider