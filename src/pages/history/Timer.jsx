import React, { useState, useEffect } from 'react'

const Timer = ({ initialSeconds }) => {
    const [seconds, setSeconds] = useState(initialSeconds)

    useEffect(() => {
        if (seconds <= 0) return

        const interval = setInterval(() => {
            setSeconds((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(interval) // очистка интервала
    }, [seconds])

    return seconds
}

export default Timer
