import React from "react"
import { useQuery } from "@tanstack/react-query"
import { getFile } from "../../api/config.js"
import { Image, Skeleton } from "antd"

const GetFile = ({ id, className, defImg, odiy }) => {

    const { data, isLoading } = useQuery({
        queryKey: ["img", id],
        queryFn: () => getFile(id),
        enabled: !!id, // Отключает запрос, если id = null или undefined
    })


    return !id ? (
        defImg ? (
            <img className={`get-file-img ${className}`} src={defImg} alt="img" />
        ) : (
            <Skeleton.Avatar className={`get-file-sk ${className}`} active shape="circle" />
        )
    ) : isLoading ? (
        <Skeleton.Avatar className={`get-file-sk ${className}`} active shape="circle" />
    ) : odiy ? (
        <img className={`get-file-img ${className}`} src={data} alt="img" />
    ) : (
        <Image className={`get-file-img ${className}`} src={data} alt="img" />
    )
}

export default GetFile
