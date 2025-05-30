import axios from "axios"
import $api, {API_TEST} from "./api.js"

export const userLang = navigator.language || navigator.userLanguage

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGhvbmVfbnVtYmVyIjoiKzk5ODMzNzgyMDA5MCIsImlhdCI6MTc0ODQ5NzY5OX0.ZbR4_Stj3oa2dhsFP_DbPPJOPbFjkjV1xcpGak8eOWY'
export const $resp = axios.create({
    baseURL: API_TEST,
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }
})

export const $adminResp = axios.create({
    baseURL: API_TEST,
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem('admin-token'),
    }
})


export const getFile = async (id) => {
    const response = await $api.get(`/file/get-id/${id}`, {
        responseType: "blob", // 👈 Добавляем, чтобы получить бинарные данные
    })
    return URL.createObjectURL(response.data) // 👈 Создаём URL для <img>
}
