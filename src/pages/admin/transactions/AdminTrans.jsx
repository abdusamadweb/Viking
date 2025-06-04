import React, {useState} from 'react';
import Title from "../../../components/admin/title/Title.jsx";
import {Form, Modal, Pagination, Table} from "antd";
import {formatPrice} from "../../../assets/scripts/global.js";
import {useQuery} from "@tanstack/react-query";
import {$adminResp} from "../../../api/config.js";


// fetches
const fetchData = async (body) => {
    const { data } = await $adminResp.post(`/transaction/filter?page=${body.page}&limit=${body.limit}`, body)
    return data
}


const AdminTrans = () => {

    const [modal, setModal] = useState('close')
    const [selectedItem, setSelectedItem] = useState(null)


    // filter data
    const [body, setBody] = useState({
        page: 1,
        limit: 30,
    })

    const { data, isLoading } = useQuery({
        queryKey: ['admin-transaction', JSON.stringify(body)],
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
                <span>{ i.card_number ? i.card_number : `Bet provider: ${i.bet_provider}` }</span>
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
    ]


    return (
        <div className="other page">
            <div className="container">
                <Title title="Транзакции" />
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
                ></Modal>
        </div>
    );
};

export default AdminTrans