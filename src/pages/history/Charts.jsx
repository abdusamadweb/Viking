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

// Регистрация плагинов
ChartJS.register(ArcElement, Tooltip, Legend, Title, SubTitle)

const data = {
    labels: ['1XBet', 'Marafon Bet', 'Parimatch', 'Bet365', 'Other'],
    datasets: [
        {
            label: 'Пополнения',
            data: [4000000, 3000000, 1500000, 1000000, 500000],
            backgroundColor: ['#0088FE', '#FFBB28', '#00C49F', '#8A2BE2', '#32CD32'],
            borderWidth: 0,
        },
    ],
}

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
        },
    },
}

const Charts = () => {
    return <Pie data={data} options={options} />
}

export default Charts
