
export const antdConfigAdmin = () => {

    return {
        token: {
            fontFamily: "Nunito, sans-serif",
            colorPrimary: '#0095FF',
            colorSecondary: '#1F0261',
            colorText: '#011d42',
        },
        components: {
            Input: {
                fontSize: 16,
                paddingBlock: 8,
                paddingInline: 16,
                borderRadius: 10,
            },
            InputNumber: {
                fontSize: 16,
                paddingBlock: 8,
                paddingInline: 16,
                borderRadius: 10,
            },
            Button: {
                borderRadius: 10,
            },
            Menu: {
                iconSize: 16,
            },
            Tooltip: {
                colorBgSpotlight: '#222222dd'
            },
        }
    }
}