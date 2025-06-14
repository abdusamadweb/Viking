import { miniApp, init } from "@telegram-apps/sdk";

export const expandApp = async () => {
    try {
        await init(); // Убедимся, что SDK инициализирован

        if (!miniApp.ready.isAvailable()) {
            console.warn("Мини-приложение не запущено в Telegram.");
            return;
        }

        if (miniApp.viewport?.expand) {
            miniApp.viewport.expand();
            console.log("Приложение развернуто!");
        } else {
            console.error("Метод expand не найден!");
        }
    } catch (error) {
        console.error("Ошибка инициализации Telegram SDK:", error);
    }
}

export const parseTelegramWebAppData = () => {
    const hash = window.location.hash
    const urlParams = new URLSearchParams(hash.split('#')[1])
    const rawData = urlParams.get('tgWebAppData')

    if (!rawData) return null

    const decoded = decodeURIComponent(rawData) // query_id=...&user=...&auth_date=...&...
    const result = {}

    decoded.split('&').forEach(pair => {
        const [key, value] = pair.split('=')

        // Agar `user` bo‘lsa, u JSON bo‘ladi, alohida parse qilamiz
        if (key === 'user') {
            try {
                result[key] = JSON.parse(decodeURIComponent(value))
            } catch (e) {
                result[key] = null
            }
        } else {
            result[key] = decodeURIComponent(value)
        }
    })

    return result
}
