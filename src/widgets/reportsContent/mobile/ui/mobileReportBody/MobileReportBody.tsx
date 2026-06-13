import {ReportCards, type TReportCardItem} from '@/widgets/reportsContent/ui/reportCards';
import {Skeleton} from 'antd';
import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';
import Styles from '@/widgets/reportsContent/reportsContent.module.css';
import type {ReactNode} from 'react';

type TMobileReportBodyBaseProps = {
    emptyText: string;
    isLoading: boolean;
    isError?: boolean;
    errorMessage?: string;
};

type TMobileReportBodyProps = TMobileReportBodyBaseProps & {
    items?: TReportCardItem[];
    children?: ReactNode;
    isEmpty?: boolean;
};

/**
 * Отображает тело мобильного отчёта с состояниями загрузки и ошибки.
 * @param props Свойства тела отчёта.
 */
export const MobileReportBody = ({
    items,
    children,
    emptyText,
    isEmpty,
    isLoading,
    isError = false,
    errorMessage,
}: TMobileReportBodyProps) => {
    if (isLoading) {
        return <Skeleton active paragraph={{rows: 3}} title={false} />;
    }

    if (isError) {
        return <ApiErrorMessage message={errorMessage} />;
    }

    if (children !== undefined) {
        return isEmpty ? <div className={Styles.reportsContent__empty}>{emptyText}</div> : children;
    }

    return <ReportCards items={items ?? []} emptyText={emptyText} />;
};
