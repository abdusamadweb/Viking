import React, {useEffect, useState} from 'react'
import {Spin} from "antd"

const Loader = ({ setLoading, isPending, sliderLoading }) => {

    const [visible, setVisible] = useState(true)

    useEffect(() => {
        let visibleFlag = false

        if (sliderLoading || isPending) {
            visibleFlag = isPending
        }

        const visibleTimeout = setTimeout(() => {
            setVisible(visibleFlag)

            const loadingTimeout = setTimeout(() => {
                setLoading(false)
            }, 600)

            return () => clearTimeout(loadingTimeout)
        }, 1000)

        return () => clearTimeout(visibleTimeout)
    }, [isPending, setLoading, sliderLoading])


    return (
        <div className={`loader grid-center ${!visible ? "hidden" : ""}`}>
            <Spin size="large"/>
        </div>
    );
};

export default Loader;