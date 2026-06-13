import {type TSalesReportRow, useGetSalesReportQuery} from '@/entities/reports';
import type {ColumnsType} from 'antd/es/table';
import {formatAmount, formatDate} from '@/shared/lib/formatters';
import {Table} from 'antd';
import {useReportFilters} from '@/widgets/reportsContent/hook';
import {ReportToolbar} from '@/widgets/reportsContent/ui/reportToolbar';
import {PAGE_SIZE} from '@/widgets/reportsContent/model';
import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';

const columns: ColumnsType<TSalesReportRow> = [
    {title: 'ID сделки', dataIndex: 'dealId', key: 'dealId', sorter: (a, b) => a.dealId.localeCompare(b.dealId)},
    {title: 'Название', dataIndex: 'title', key: 'title', sorter: (a, b) => a.title.localeCompare(b.title)},
    {
        title: 'Клиент',
        dataIndex: 'clientName',
        key: 'clientName',
        sorter: (a, b) => a.clientName.localeCompare(b.clientName),
    },
    {
        title: 'Сумма',
        dataIndex: 'amount',
        key: 'amount',
        sorter: (a, b) => a.amount - b.amount,
        render: (v: number) => formatAmount(v),
    },
    {
        title: 'Дата завершения',
        dataIndex: 'completedAt',
        key: 'completedAt',
        sorter: (a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime(),
        render: (v: string) => formatDate(v),
    },
];

export const SalesReport = () => {
    const {period, applied, handlePeriodChange} = useReportFilters();
    const {data = [], isLoading, isError} = useGetSalesReportQuery(applied);

    return (
        <>
            <ReportToolbar period={period} onPeriodChange={handlePeriodChange} reportName="sales" filters={applied} />
            {isError && <ApiErrorMessage message="Не удалось загрузить отчёт по продажам." />}
            <Table
                columns={columns}
                dataSource={data}
                rowKey="dealId"
                loading={isLoading}
                size="small"
                pagination={{pageSize: PAGE_SIZE, showSizeChanger: false, showTotal: (t) => `Всего: ${t}`}}
            />
        </>
    );
};
