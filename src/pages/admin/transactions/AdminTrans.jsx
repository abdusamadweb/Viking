import React, {useState} from 'react';
import Title from "../../../components/admin/title/Title.jsx";
import {Form, Input, Pagination, Select, Table} from "antd";
import {formatCard, formatPrice} from "../../../assets/scripts/global.js";
import {useQuery} from "@tanstack/react-query";
import {$adminResp} from "../../../api/config.js";
import {toast} from "react-hot-toast";
import {tableCols} from "../../../components/admin/table/columns.js";
import Actions from "../../../components/admin/table/Actions.jsx";
import AddOrUpdateModal from "./AddOrUpdateModal.jsx";


// fetches
const fetchData = async (body) => {
    try {
        const { data } = await $adminResp.post(`/transaction/filter?page=${body.page}&limit=${body.limit}`, body)
        return data
    } catch (error) {
        if (error?.response?.status === 403) {
            toast.error("Sessiya tugagan. Qayta kiring.")
            logoutAdmin()
        } else {
            toast.error("Xatolik yuz berdi")
        }
        throw error
    }
}


const AdminTrans = () => {

    const [modal, setModal] = useState('close')
    const [selectedItem, setSelectedItem] = useState(null)


    // filter data
    const [body, setBody] = useState({
        page: 1,
        limit: 30,
        q: null,
        program: true,
        type: 'wallet',
        status: null
    })

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['admin-transaction', body.page, body.limit, body.q, body.program, body.status, body.type],
        queryFn: () => fetchData(body),
        keepPreviousData: true,
    })


    // table
    const columns = [
        {
            title: '№',
            dataIndex: 'index',
            key: 'index',
            render: (_, __, index) => (
                <span>{(body.page - 1) * body.limit + index + 1}</span>
            )
        },
        {
            title: 'Имя карты',
            dataIndex: 'card_name',
            key: 'card_name',
            render: (_, i) => (
                <span>{ i.card_name ? i.card_name : i.type }</span>
            )
        },
        {
            title: 'Номер карты',
            dataIndex: 'card_number',
            key: 'card_number',
            render: (_, i) => (
                <span>{ i.card_number ? formatCard(i.card_number) : `Bet provider: ${i.bet_provider}` }</span>
            )
        },
        {
            title: 'Сумма',
            dataIndex: 'amount',
            key: 'amount',
            render: (_, i) => (
                <span className={`fw600 ${i.program ? 'green' : 'red'}`}>
                    { i.program ? '+' : '-' }{ formatPrice(i.amount || 0) } сум
                </span>
            )
        },
        {
            title: 'Описание',
            dataIndex: 'desc',
            key: 'desc'
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: (_, i) => (
                <span className={`status white ${i.status}`}>{ i.status }</span>
            )
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


    return (
        <div className="admin-trans other page">
            <div className="container">
                <Title
                    title="Транзакции"
                    additional={
                        <div className="row g10">
                            <button className='admin-titles__btn' onClick={() => setModal('deposit')}>
                                <span>Deposit</span>
                                <i className="fa-solid fa-circle-plus"/>
                            </button>
                            <button className='admin-titles__btn' onClick={() => setModal('withdraw')}>
                                <span>Withdraw</span>
                                <i className="fa-solid fa-circle-plus"/>
                            </button>
                        </div>
                    }
                />
                <div className="content">
                    <div className="filters">
                        <Input placeholder="Search . . ." />
                        <Select
                            size='large'
                            placeholder="Ne vibrano"
                            options={[
                                {
                                    label: 'Ne vibrano',
                                    value: null,
                                },
                                {
                                    label: 'Пополнение баланса',
                                    value: true,
                                },
                                {
                                    label: 'Снято с баланса',
                                    value: false,
                                },
                            ]}
                        />
                        <Select
                            size='large'
                            placeholder="Ne vibrano"
                            options={[
                                {
                                    label: 'Ne vibrano',
                                    value: null,
                                },
                                {
                                    label: 'Wallet',
                                    value: 'wallet',
                                },
                                {
                                    label: 'Provider',
                                    value: 'provider',
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

            <AddOrUpdateModal
                modal={modal}
                setModal={setModal}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                refetch={refetch}
            />
        </div>
    );
};

export default AdminTrans