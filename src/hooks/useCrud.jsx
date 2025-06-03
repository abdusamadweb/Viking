import {useMutation} from '@tanstack/react-query'
import {toast} from 'react-hot-toast'
import {$adminResp} from "../api/config.js";

export const logout = () => {
    localStorage.clear()
    setTimeout(() => window.location.href = '/admin/login', 1000)
}
export const logoutAdmin = () => {
    localStorage.clear()
    setTimeout(() => window.location.href = '/admin/login', 1000)
}


export const getRequest = async (url, config = {}) => {
    try {
        const { data } = await $adminResp.get(url, config)
        return data
    } catch (error) {
        if (error?.response?.status === 403) {
            toast.error("Sessiya tugagan. Qayta kiring.")
            logout()
        } else {
            toast.error("Xatolik yuz berdi")
        }
        throw error
    }
}

export const getRequestAdmin = async (url, config = {}) => {
    try {
        const { data } = await $adminResp.get(url, config)
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


export const useCrud = (key, options) => {

    const {
        refetch,
        form,
        setModal,
        setSelectedItem,
        addOrEdit,
        deleteData
    } = options

    const addOrEditMutation = useMutation({
        mutationFn: ({ values, selectedItem }) => {
            return addOrEdit(
                key,
                { ...values },
                selectedItem?.id || false
            )
        },
        onSuccess: async () => {
            await refetch()

            toast.success('Qoshildi!')

            setModal('close')
            setSelectedItem(null)
            form.resetFields()
        },
        onError: (err) => {
            toast.error(`Ошибка: ${err.response?.data?.message || err.message}`)

            if (err.status === 403) {
                logout()
            }
        }
    })

    const deleteMutation = useMutation({
        mutationFn: (id) => deleteData(key, id),
        onSuccess: async () => {
            await refetch()
            toast.success('Ochirildi!')
        },
        onError: (err) => {
            toast.error(`Ошибка: ${err.response?.data?.message || err.message}`)

            if (err.status === 403) {
                logout()
            }
        }
    })

    return {
        addOrEditMutation,
        deleteMutation
    }
}
