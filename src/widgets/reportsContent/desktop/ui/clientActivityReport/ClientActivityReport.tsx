import {type TClientActivityReportRow, useGetClientActivityReportQuery} from "@/entities/reports";
import type {ColumnsType} from "antd/es/table";
import {Table} from "antd";
import {useReportFilters} from "@/widgets/reportsContent/hook";
import {PAGE_SIZE} from "@/widgets/reportsContent/model";
import {ReportToolbar} from "@/widgets/reportsContent/ui/reportToolbar";
import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';

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


export const ClientActivityReport = () => {
    const {period, applied, handlePeriodChange} = useReportFilters();
    const {data = [], isLoading, isError} = useGetClientActivityReportQuery(applied);

    return (
        <>
            <ReportToolbar
                period={period}
                onPeriodChange={handlePeriodChange}
                reportName="client-activity"
                filters={applied}
            />
            {isError && <ApiErrorMessage message="Не удалось загрузить отчёт по активности клиентов." />}
            <Table
                columns={columns}
                dataSource={data}
                rowKey="clientId"
                loading={isLoading}
                size="small"
                pagination={{pageSize: PAGE_SIZE, showSizeChanger: false, showTotal: (t) => `Всего: ${t}`}}
            />
        </>
    );
};
