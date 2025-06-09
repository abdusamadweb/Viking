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

    const formatTime = (totalSeconds) => {
        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
        const secs = String(totalSeconds % 60).padStart(2, '0')
        return `${minutes}:${secs}`
    }

    return formatTime(seconds)
}

export default Timer
