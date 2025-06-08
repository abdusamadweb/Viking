import './History.scss'
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Segmented, Select} from "antd";
import Charts from "./Charts.jsx";
import {$resp} from "../../api/config.js";
import {useQuery} from "@tanstack/react-query";
import {formatPrice} from "../../assets/scripts/global.js";


// fetch
const getStatistic = async (body) => {
    const { data } = await $resp.post("/statics/my-statics", body)
    return data
}


const Monitoring = () => {

    const navigate = useNavigate()

    const [nav, setNav] = useState(false)
    const [days, setDays] = useState('30')


    // fetch
    const { data, refetch } = useQuery({
        queryKey: ['statistic', {last_days: days, program: String(nav)}],
        queryFn: ({ queryKey }) => {
            const [_key, body] = queryKey
            return getStatistic(body)
        },
        keepPreviousData: true,
    })

    const items = data?.data?.labels.map((label, index) => {
        const value = data?.data?.label_data[index]
        const percent = data?.data?.total ? Math.round((value / data?.data?.total) * 100) : 0

        return (
            <li className='list__item'>
                <div className="row align-center g10">
                    <span className="percent">{ percent }%</span>
                    <span className="txt">{ label }</span>
                </div>
                <div className="value">{ value.toLocaleString() } сум</div>
            </li>
        )
    })


    return (
        <div className="monitoring page">
            <div className="container">
                <div className="monitoring__head">
                    <div className="titles row align-center g1">
                        <button className='back' onClick={() => navigate(-1)}>
                            <i className="fa-solid fa-circle-chevron-left"/>
                        </button>
                        <span>Мониторинг</span>
                    </div>
                    <Segmented
                        options={['Пополнение', 'Снятие']}
                        onChange={() => {
                            setNav(!nav)
                            refetch()
                        }}
                    />
                    <Select
                        className="select"
                        defaultValue='30'
                        onChange={(e) => {
                            setDays(e)
                            refetch()
                        }}
                        options={[
                            { value: '1', label: 'За последний 1 дней' },
                            { value: '7', label: 'За последний 7 дней' },
                            { value: '30', label: 'За последний 30 дней' },
                        ]}
                    />
                </div>
                <div className='monitoring__body'>
                    <Charts data={data} />
                    <div className="summary row between align-center">
                        <span className="txt">{ !nav ? 'Общее пополнение' : 'Общее снятие' }</span>
                        <span className="value">{ formatPrice(data?.data?.total || 0) } сум</span>
                    </div>
                    <ul className='list'>
                        {items}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Monitoring;