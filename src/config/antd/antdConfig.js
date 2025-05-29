
export const antdConfig = () => {

    return {
        token: {
            fontFamily: "Nunito",
            colorPrimary: '#0095FF',
            colorText: '#222222',
        },
        components: {
            Input: {
                colorText: '#fff',
                fontSize: 16,
                paddingBlock: 8,
                paddingInline: 16,
                borderRadius: 12,
                colorBorder: '#434A5B',
            },
            DatePicker: {
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
            },
            Segmented: {
                trackBg: '#323F59',
                itemActiveBg: '#323F59',
                itemColor: '#ffffff',
                itemHoverColor: '#ffffff',
                borderRadius: 10,
                trackPadding: 2
            },
            Select: {
                colorBgContainer: '#0C124E',
                colorBgElevated: '#0C124E',
                colorText: '#fff',
                colorTextPlaceholder: '#fff',
                optionSelectedBg: '#1a2263',

                optionLineHeight: 1.5,
                borderRadius: 10,
                controlHeight: 43
            },
            Pagination: {
                colorText: '#fff',
                colorBgContainer: '#272F71',
                colorTextDisabled: '#777',
            }
        }
    }
}