import React, {useEffect} from 'react';
import {Navigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {$adminResp} from "../../api/config.js";

const fetchMe = async () => {
    const { data } = await $adminResp.post(`/user/me`)
    return data
}

const Admin = () => {

    const token = localStorage.getItem('admin-token')

    const { data: me } = useQuery({
        queryKey: ['me-admin'],
        queryFn: fetchMe,
        keepPreviousData: true,
        enabled: !!token
    })
    useEffect(() => {
        if (me) localStorage.setItem('me-admin', JSON.stringify(me?.data))
    }, [me])


    return (
        token ? <Navigate to='/admin/transactions' />
            : <Navigate to='/admin/login' />
    );
};

export default Admin