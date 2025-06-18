import { useEffect } from 'react'

const PreLoadImg = () => {
    useEffect(() => {
        const images = import.meta.glob('../../assets/images/*.{png,jpg,jpeg,svg}', {
            eager: true,
            import: 'default',
        })

        Object.values(images).forEach((src) => {
            const img = new Image()
            img.src = src
        })
    }, [])

    return null // компонент ничего не рендерит, просто грузит
}

export default PreLoadImg
