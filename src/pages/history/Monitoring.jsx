import './History.scss'
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Segmented, Select} from "antd";
import Charts from "./other/Charts.jsx";
import {$resp} from "../../api/config.js";
import {useQuery} from "@tanstack/react-query";
import {formatPrice} from "../../assets/scripts/global.js";
import {Tr, trans} from "../../components/translator/Tr.js";


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
        queryKey: ['statistic', {last_days: days, program: String(!nav)}],
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
                <div className="value">{ value.toLocaleString() } uzs</div>
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
                        <span><Tr val='Мониторинг' /></span>
                    </div>
                    <Segmented
                        options={[trans('Пополнение'), trans('Снятие')]}
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
                            { value: '1', label: trans('За последний 1 дней') },
                            { value: '7', label: trans('За последний 7 дней') },
                            { value: '30', label: trans('За последний 30 дней') },
                        ]}
                    />
                </div>
                <div className='monitoring__body'>
                    <Charts data={data} />
                    <div className="summary row between align-center">
                        <span className="txt">{ !nav ? trans('Общее пополнение') : trans('Общее снятие') }</span>
                        <span className="value">{ formatPrice(data?.data?.total || 0) } uzs</span>
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