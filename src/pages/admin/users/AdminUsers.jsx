import React, {useEffect, useState} from 'react';
import Title from "../../../components/admin/title/Title.jsx";
import {Button, Form, Input, Modal, Pagination, Table, Upload} from "antd";
import {formatPhone, formatPrice, uploadProps, validateMessages} from "../../../assets/scripts/global.js";
import {addOrEdit, deleteData} from "../../../api/crud.js";
import {useQuery} from "@tanstack/react-query";
import {tableCols} from "../../../components/admin/table/columns.js";
import Actions from "../../../components/admin/table/Actions.jsx";
import {useCrud} from "../../../hooks/useCrud.jsx";
import {$adminResp} from "../../../api/config.js";
import GetFile from "../../../components/get-file/GetFile.jsx";
import {formatNumber} from "chart.js/helpers";


// fetches
const fetchData = async (body) => {
    const { data } = await $adminResp.get(`/user/all-users?is_system_user=${body.system}&q=${body.q}&page=${body.page}&limit=${body.limit}`, body)
    return data
}


const AdminProviders = () => {

    const [form] = Form.useForm()

    const [modal, setModal] = useState('close')
    const [selectedItem, setSelectedItem] = useState(null)

    const [file, setFile] = useState(null)


    // filter data
    const [body, setBody] = useState({
        system: false,
        q: '',
        page: 1,
        limit: 30,
    })

    const { data, refetch, isLoading } = useQuery({
        queryKey: ['admin-providers', JSON.stringify(body)],
        queryFn: () => fetchData(body),
        keepPreviousData: true,
    })


    // table
    const columns = [
        tableCols.id,
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, i) => (
                <span>{ i.first_name + ' ' + i.last_name }</span>
            )
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (_, i) => (
                <span>{ formatPrice(i.amount || 0) } сум</span>
            )
        },
        {
            title: 'Phone',
            dataIndex: 'phone_number',
            key: 'phone_number',
            render: (_, i) => (
                <span>{ formatPhone(i.phone_number) }</span>
            )
        },
        {
            title: 'Chat ID',
            dataIndex: 'chat_id',
            key: 'chat_id',
        },
        {
            title: 'Register date',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (_, i) => (
                <span>{ new Date(i.created_at)?.toLocaleDateString() }</span>
            )
        },
        {
            title: 'Last login',
            dataIndex: 'last_login_time',
            key: 'last_login_time',
            render: (_, i) => (
                <span>{ i.last_login_time ? new Date(i.last_login_time)?.toLocaleDateString() : '_' }</span>
            )
        },
        // {
        //     ...tableCols.actions,
        //     render: (_, i) => <Actions
        //         setModal={setModal}
        //         setSelectedItem={setSelectedItem}
        //         i={i}
        //     />
        // },
    ]


    return (
        <div className="other page">
            <div className="container">
                <Title title="Юзеры" />
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
                    // onFinish={onFormSubmit}
                    layout='vertical'
                    validateMessages={validateMessages}
                    form={form}
                >


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

export default AdminProviders