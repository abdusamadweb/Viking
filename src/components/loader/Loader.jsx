import React, {useEffect, useState} from 'react'
import {Spin} from "antd"

const Loader = ({ setLoading, isPending }) => {

    const [visible, setVisible] = useState(true)

    useEffect(() => {
        
        if (isPending) {
            setTimeout(() => {
                setVisible(isPending)
                setTimeout(() => setLoading(false), 600)
            }, 1000)
        } else {
            setTimeout(() => {
                setVisible(false)
                setTimeout(() => setLoading(false), 600)
            }, 1000)
        }
        
    }, [isPending, setLoading])


    return (
        <div className={`loader grid-center ${!visible ? "hidden" : ""}`}>
            <Spin size="large"/>
        </div>
    );
};

export default Loader;