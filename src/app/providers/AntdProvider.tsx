import {ConfigProvider, type ThemeConfig} from 'antd';
import ruRU from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import {type ReactNode} from 'react';

dayjs.locale('ru');

const theme: ThemeConfig = {
    token: {
        colorPrimary: '#3B82F6',
        colorPrimaryHover: '#2563EB',
        colorPrimaryActive: '#1D4ED8',
        colorError: '#EF4444',
        colorSuccess: '#10B981',
        colorWarning: '#F59E0B',
        colorText: '#1F2937',
        colorTextSecondary: '#6B7280',
        colorTextDisabled: '#9CA3AF',
        colorBorder: '#D1D5DB',
        colorBgBase: '#F3F4F6',
        colorBgContainer: '#FFFFFF',
        colorFillSecondary: '#E5E7EB',
        borderRadius: 12,
        borderRadiusSM: 4,
        controlHeight: 40,
        fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontSize: 16,
    },
    components: {
        Layout: {
            headerBg: '#FFFFFF',
            siderBg: '#FFFFFF',
        },
        Button: {
            colorPrimary: '#3B82F6',
            colorPrimaryHover: '#2563EB',
            colorPrimaryActive: '#1D4ED8',
            primaryShadow: 'none',
            defaultShadow: 'none',
            borderRadius: 6,
            contentFontSize: 16,
            paddingInline: 16,
        },
        Input: {
            borderRadius: 4,
            inputFontSize: 16,
            paddingBlock: 8,
            paddingInline: 14,
            colorBorder: '#D1D5DB',
            colorBgContainer: '#FFFFFF',
            colorText: '#1F2937',
            colorPrimaryHover: '#2563EB',
            activeBorderColor: '#3B82F6',
            hoverBorderColor: '#2563EB',
        },
        Table: {
            headerBg: '#FFFFFF',
            headerColor: '#1F2937',
            headerBorderRadius: 8,
            headerSplitColor: 'transparent',
            borderColor: 'transparent',
            bodySortBg: '#FFFFFF',
            rowHoverBg: '#F3F4F6',
            rowSelectedBg: '#FFFFFF',
            rowSelectedHoverBg: '#FFFFFF',
            cellFontSize: 14,
            cellFontSizeMD: 14,
            cellFontSizeSM: 14,
            cellPaddingBlock: 8,
            cellPaddingInline: 24,
            cellPaddingBlockMD: 8,
            cellPaddingInlineMD: 24,
            cellPaddingBlockSM: 8,
            cellPaddingInlineSM: 24,
        },
    },
};

type TAntdProviderProps = {
  children: ReactNode;
};

export const AntdProvider = ({children}: TAntdProviderProps) => {
    return (
        <ConfigProvider locale={ruRU} theme={theme}>
            {children}
        </ConfigProvider>
    );
};
