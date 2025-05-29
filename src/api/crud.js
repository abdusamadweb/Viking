import {$adminResp, $resp} from "./config.js";

// add or edit item
export const addOrEdit = async (url, value, id) => {
    const res = await $adminResp({
        url: id ? `${url}/update/${id}` : `${url}/create`,
        method: id ? "PUT" : "POST",
        data: value,
    })
    return res.data
}
export const addOrEditUser = async (url, value, id) => {
    const res = await $resp({
        url: id ? `${url}/update/${id}` : `${url}/create`,
        method: id ? "PUT" : "POST",
        data: value,
    })
    return res.data
}

// delete item
export const deleteData = async (url, id) => {
    const res = await $adminResp({
        url: `${url}/remove/${id}`,
        method: "DELETE",
    })
    return res.data
}
export const deleteDataUser = async (url, id) => {
    const res = await $resp({
        url: `${url}/remove/${id}`,
        method: "DELETE",
    })
    return res.data
}
