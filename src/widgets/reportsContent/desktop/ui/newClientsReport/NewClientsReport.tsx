import {type TNewClientReportRow, useGetNewClientsReportQuery} from "@/entities/reports";
import type {ColumnsType} from "antd/es/table";
import {formatDate} from "@/shared/lib/formatters";
import {Table} from "antd";
import {ReportToolbar} from "@/widgets/reportsContent/ui/reportToolbar";
import {PAGE_SIZE} from "@/widgets/reportsContent/model";
import {useReportFilters} from "@/widgets/reportsContent/hook";
import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';

const columns: ColumnsType<TNewClientReportRow> = [
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
    {title: 'Компания', dataIndex: 'company', key: 'company', sorter: (a, b) => a.company.localeCompare(b.company)},
    {
        title: 'Дата добавления',
        dataIndex: 'createdAt',
        key: 'createdAt',
        sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        render: (v: string) => formatDate(v),
    },
];

export const NewClientsReport = () => {
    const {period, applied, handlePeriodChange} = useReportFilters();
    const {data = [], isLoading, isError} = useGetNewClientsReportQuery(applied);

    return (
        <>
            <ReportToolbar
                period={period}
                onPeriodChange={handlePeriodChange}
                reportName="new-clients"
                filters={applied}
            />
            {isError && <ApiErrorMessage message="Не удалось загрузить отчёт по новым клиентам." />}
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
