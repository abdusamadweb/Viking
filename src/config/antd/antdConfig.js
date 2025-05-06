
export const antdConfig = () => {

    return {
        token: {
            fontFamily: "Nunito",
            colorPrimary: '#0063F2',
            colorText: '#222222',
        },
        components: {
            Input: {
                fontSize: 16,
                paddingBlock: 8,
                paddingInline: 16,
                borderRadius: 12,
                colorBorder: '#434A5B',
            },
            InputNumber: {
                fontSize: 16,
                paddingBlock: 8,
                paddingInline: 16,
                borderRadius: 10,
            },
            Button: {
                borderRadius: 12,
                defaultActiveColor: '#fff',
                defaultHoverColor: '#fff'
            },
            Menu: {
                iconSize: 16,
            },
            Tooltip: {
                colorBgSpotlight: '#222222dd'
            }
        }
    }
}