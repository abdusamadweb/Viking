import axios from "axios"
import $api, {API_TEST} from "./api.js"

export const userLang = navigator.language || navigator.userLanguage

export const $resp = axios.create({
    baseURL: API_TEST,
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
    }
})

// Interceptor: har bir so‘rovdan oldin tokenni qo‘shadi
$resp.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})


export const $adminResp = axios.create({
    baseURL: API_TEST,
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem('admin-token'),
    }
})

// Admin token interceptor
$adminResp.interceptors.request.use((config) => {
    const token = localStorage.getItem("admin-token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})


export const getFile = async (id) => {
    const response = await $api.get(`/file/get-id/${id}`, {
        responseType: "blob", // 👈 Добавляем, чтобы получить бинарные данные
    })
    return URL.createObjectURL(response.data) // 👈 Создаём URL для <img>
}
