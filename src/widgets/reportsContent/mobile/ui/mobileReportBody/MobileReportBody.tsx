import {ReportCards, type TReportCardItem} from "@/widgets/reportsContent/ui/reportCards";
import {Skeleton} from "antd";

type TMobileReportBodyProps = {
    items: TReportCardItem[];
    emptyText: string,
    isLoading: boolean;
}

export const MobileReportBody = ({
                                     items,
                                     emptyText,
                                     isLoading,
                                 }: TMobileReportBodyProps) => {
    if (isLoading) {
        return <Skeleton active paragraph={{rows: 3}} title={false}/>;
    }

    return <ReportCards items={items} emptyText={emptyText}/>;
};