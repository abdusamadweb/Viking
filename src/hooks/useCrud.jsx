import {useMutation} from '@tanstack/react-query'
import {toast} from 'react-hot-toast'

export const logout = () => {
    localStorage.clear()
    setTimeout(() => window.location.href = '/login', 1000)
}
export const logoutAdmin = () => {
    localStorage.clear()
    setTimeout(() => window.location.href = '/admin/login', 1000)
}


export const requestUnified = async (options) => {
    const {
        method = 'get',      // 'get' yoki 'post'
        url,
        data = {},           // faqat POST uchun ishlatiladi
        config = {},
        instance,
        logoutFn = null
    } = options

    try {
        const response = method.toLowerCase() === 'post'
            ? await instance.post(url, data, config)
            : await instance.get(url, config)

        return response.data
    } catch (error) {
        if (error?.response?.status === 403) {
            toast.error("Sessiya tugagan. Qayta kiring.")
            if (logoutFn) logoutFn()
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
                // logout()
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
                // logout()
            }
        }
    })

    return {
        addOrEditMutation,
        deleteMutation
    }
}
