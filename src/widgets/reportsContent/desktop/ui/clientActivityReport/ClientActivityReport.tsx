import type {TReportViewProps} from "@/widgets/reportsContent/ui/overdueTasksReport";
import {type TClientActivityReportRow, useGetClientActivityReportQuery} from "@/entities/reports";
import type {ColumnsType} from "antd/es/table";
import {getClientActivityCards} from "@/widgets/reportsContent/lib";
import {Table} from "antd";
import {useReportFilters} from "@/widgets/reportsContent/hook";
import {PAGE_SIZE} from "@/widgets/reportsContent/model";
import {ReportToolbar} from "@/widgets/reportsContent/ui/reportToolbar";
import {lazy, Suspense} from "react";
import {Preloader} from "@/shared/ui/preloader";

const MobileReportBody = lazy(() => import("@/widgets/reportsContent/mobile/ui/mobileReportBody").then((module) => ({
    default:
    module.MobileReportBody
})));

const columns: ColumnsType<TClientActivityReportRow> = [
    {
        title: 'ID клиента',
        dataIndex: 'clientId',
        key: 'clientId',
        sorter: (a, b) => a.clientId.localeCompare(b.clientId),
    },
    {
        title: 'Имя клиента',
        dataIndex: 'clientName',
        key: 'clientName',
        sorter: (a, b) => a.clientName.localeCompare(b.clientName),
    },
    {
        title: 'Кол-во сделок',
        dataIndex: 'dealsCount',
        key: 'dealsCount',
        sorter: (a, b) => a.dealsCount - b.dealsCount,
    },
    {
        title: 'Завершённые задачи',
        dataIndex: 'completedTasks',
        key: 'completedTasks',
        sorter: (a, b) => a.completedTasks - b.completedTasks,
    },
];


export const ClientActivityReport = ({isMobile = false}: TReportViewProps) => {
    const {period, applied, handlePeriodChange} = useReportFilters();
    const {data = [], isLoading} = useGetClientActivityReportQuery(applied);

    return (
        <>
            <ReportToolbar
                period={period}
                onPeriodChange={handlePeriodChange}
                reportName="client-activity"
                filters={applied}
            />
            {isMobile ?
                <Suspense fallback={<Preloader/>}>
                    <MobileReportBody
                        items={getClientActivityCards(data)}
                        emptyText="Нет активности клиентов"
                        isLoading={isLoading}
                    />
                </Suspense>
                :
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="clientId"
                    loading={isLoading}
                    size="small"
                    pagination={{pageSize: PAGE_SIZE, showSizeChanger: false, showTotal: (t) => `Всего: ${t}`}}
                />
            }
        </>
    );
};