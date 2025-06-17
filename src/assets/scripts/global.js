import {$resp} from "../../api/config.js"
import {API_TEST} from "../../api/api.js"
import toast from "react-hot-toast"
import {Upload} from "antd"


// form
export const validateMessages = {
    required: 'Заполните поле !',
}


// site language
export const lang = localStorage.getItem('lang') || 'en'
export const changeLang = (lang) => {
    localStorage.setItem('lang', lang)
    window.location.reload()
}


// user device
export function getDeviceType() {
    const ua = navigator.userAgent

    if (/mobile/i.test(ua)) return 'Mobile'
    if (/tablet/i.test(ua)) return 'Tablet'
    if (/iPad|Android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(ua)) return 'Tablet'
    return 'Desktop'
}


// format price
export const formatPrice = (price) => {
    return Intl.NumberFormat('ru-RU').format(price)
}


// format phone number
export const formatPhone = (str) => {
    const mask = "+### ## ### ## ##"
    if (!str) return mask
    if (!mask) return str
    const numeric = str?.replaceAll(/[^\d]/g, "")
    let idx = 0
    const formatted = mask?.split("").map((el) => {
        if (el === "#") {
            el = numeric[idx]
            idx++
        }
        return el
    })
    return formatted.join("")
}


// format card
export const formatCard = (str) => {
    const mask = "#### #### #### ####"
    if (!str) return mask
    if (!mask) return str

    const numeric = str.replace(/[^\d]/g, "") // faqat raqamlar
    let idx = 0

    const formatted = mask.split("").map((el) => {
        if (el === "#") {
            const digit = numeric[idx]
            idx++
            return digit || "" // raqam qolmasa bo‘sh qoldir
        }
        return el
    })

    return formatted.join("").trim() // bo‘sh joylarni tozalash
}


// upload files
export const uploadProps = {
    name: 'file',
    maxCount: 1,
    action: API_TEST + '/file/upload',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    },
    beforeUpload: (file) => {
        const isImageOrPdf = file.type === 'application/pdf' || file.type.startsWith('image/')
        if (!isImageOrPdf) {
            toast.error('Faqat rasm yoki PDF yuklash mumkin! ❌')
            return Upload.LIST_IGNORE
        }

        const isLt1M = file.size / 5120 / 5120 < 1
        if (!isLt1M) {
            toast.error('Fayl hajmi 5MB dan kichik bo‘lishi kerak! ❌')
            return Upload.LIST_IGNORE
        }

        return true
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file)
        }

        if (info.file.status === 'done') {
            toast.success(`${info.file.name} yuklandi! ✅`)
        } else if (info.file.status === 'error') {
            toast.error(`${info.file.name} xatolik! ❌`)
        }
    },
}


// upload file
export const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append('file', file) // Важно: 'file' — это ключ, который ждёт API

    const { data } = await $resp.post('/upload-file', formData, {
        headers: { "Content-Type": "multipart/form-data" }
    })

    return data
}



