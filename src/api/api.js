import axios from 'axios'

export const API_TEST = 'https://api.viking-pay.com/api/v1'

const $api = axios.create({
    baseURL: API_TEST,
    headers: {
        "Content-Type": "application/json"
    }
})

export default $api
