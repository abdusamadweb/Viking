import React, {useEffect, useState} from 'react'
import {Player} from "@lottiefiles/react-lottie-player"
import animation from '../../assets/images/animation.json'

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
        }, 2222)

        return () => clearTimeout(visibleTimeout)
    }, [isPending, setLoading, sliderLoading])


    return (
        <div className={`loader grid-center ${!visible ? "hidden" : ""}`}>
            <Player
                autoplay
                loop
                src={animation}
                style={{ height: '100%', width: '100%' }}
            />
        </div>
    );
};

export default Loader;