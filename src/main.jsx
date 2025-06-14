import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {BrowserRouter} from "react-router-dom";
import './i18n.js'
import i18n from './i18n.js'
import {I18nextProvider} from "react-i18next";
import {ThemeProvider} from "./context/ThemeContext.jsx";
import {expandApp} from "./telegram/api.js";


const queryClient = new QueryClient()


const startApp = async () => {
    await expandApp()

    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <ThemeProvider>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <I18nextProvider i18n={i18n}>
                            <App />
                        </I18nextProvider>
                    </BrowserRouter>
                </QueryClientProvider>
            </ThemeProvider>
        </StrictMode>
    )
}

startApp()