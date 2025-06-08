import React from 'react'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
    SubTitle,
} from 'chart.js'
import { Pie } from 'react-chartjs-2'
import {Empty} from "antd";

// Регистрация плагинов
ChartJS.register(ArcElement, Tooltip, Legend, Title, SubTitle)

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
        },
    },
}

const Charts = ({ data }) => {

    const chartData = {
        labels: data?.data?.labels,
        datasets: [
            {
                label: ' ',
                data: data?.data?.label_data,
                backgroundColor: ['#0088FE', '#FFBB28', '#00C49F', '#8A2BE2', '#32CD32'],
                borderWidth: 0,
            }
        ]
    }

    return data?.data?.labels?.length ?
        <Pie data={chartData} options={options} />
        : <Empty className='py3' description={false} />
}

export default Charts
