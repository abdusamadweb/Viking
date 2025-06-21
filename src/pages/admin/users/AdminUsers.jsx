import React, {useEffect, useState} from 'react';
import Title from "../../../components/admin/title/Title.jsx";
import {Button, Form, Input, Modal, Pagination, Select, Table, Upload} from "antd";
import {formatPhone, formatPrice, uploadProps, validateMessages} from "../../../assets/scripts/global.js";
import {addOrEdit, deleteData} from "../../../api/crud.js";
import {useQuery} from "@tanstack/react-query";
import {tableCols} from "../../../components/admin/table/columns.js";
import Actions from "../../../components/admin/table/Actions.jsx";
import {useCrud} from "../../../hooks/useCrud.jsx";
import {$adminResp} from "../../../api/config.js";
import GetFile from "../../../components/get-file/GetFile.jsx";
import {formatNumber} from "chart.js/helpers";
import {useDebounce} from "../../../hooks/useDebounce.jsx";


// fetches
const fetchData = async (body) => {
    const { data } = await $adminResp.get(`/user/all-users?is_system_user=${body.system}&q=${body.q}&page=${body.page}&limit=${body.limit}`, body)
    return data
}


const AdminProviders = () => {


    // filter data
    const [searchText, setSearchText] = useState('')
    const debouncedSearch = useDebounce(searchText, 500)

    const [body, setBody] = useState({
        system: true,
        q: '',
        page: 1,
        limit: 30,
    })

    useEffect(() => {
        setBody(prev => ({
            ...prev,
            q: debouncedSearch,
            page: 1,
        }))
    }, [debouncedSearch])

    const { data, isLoading } = useQuery({
        queryKey: ['admin-providers', JSON.stringify(body)],
        queryFn: () => fetchData(body),
        keepPreviousData: true,
    })

    const handleSelectChange = (value, type) => {
        setBody(prev => ({
            ...prev,
            [type]: value,
        }))
    }


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
                    <div className="filters">
                        <Input
                            placeholder="Search . . ."
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <Select
                            size='large'
                            defaultValue={true}
                            onChange={(val) => handleSelectChange(val, 'system')}
                            options={[
                                {
                                    label: 'System user - true',
                                    value: true,
                                },
                                {
                                    label: 'System user - false',
                                    value: false,
                                },
                            ]}
                        />
                    </div>
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
        </div>
    );
};

export default AdminProviders