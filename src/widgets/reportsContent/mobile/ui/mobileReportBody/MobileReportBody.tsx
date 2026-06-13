import {ReportCards, type TReportCardItem} from "@/widgets/reportsContent/ui/reportCards";
import {Skeleton} from "antd";
import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';

type TMobileReportBodyProps = {
    items: TReportCardItem[];
    emptyText: string,
    isLoading: boolean;
    isError?: boolean;
    errorMessage?: string;
}

/**
 * Отображает тело мобильного отчёта с состояниями загрузки и ошибки.
 * @param props Свойства тела отчёта.
 */
export const MobileReportBody = ({
                                     items,
                                     emptyText,
                                     isLoading,
                                     isError = false,
                                     errorMessage,
                                 }: TMobileReportBodyProps) => {
    if (isLoading) {
        return <Skeleton active paragraph={{rows: 3}} title={false}/>;
    }

    if (isError) {
        return <ApiErrorMessage message={errorMessage}/>;
    }

    return <ReportCards items={items} emptyText={emptyText}/>;
};
