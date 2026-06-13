import {type TDealsStageReportRow, useGetDealsStageReportQuery} from "@/entities/reports";
import type {ColumnsType} from "antd/es/table";
import {DEAL_STATUS_LABELS, type TDealStatus} from "@/entities/deal";
import {Table, Tag} from "antd";
import {formatAmount} from "@/shared/lib/formatters";
import {useReportFilters} from "@/widgets/reportsContent/hook";
import {ReportToolbar} from "@/widgets/reportsContent/ui/reportToolbar";
import {PAGE_SIZE} from "@/widgets/reportsContent/model";
import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';

const columns: ColumnsType<TDealsStageReportRow> = [
    {
        title: 'Этап',
        dataIndex: 'stage',
        key: 'stage',
        render: (v: TDealStatus) => <Tag>{DEAL_STATUS_LABELS[v] ?? v}</Tag>,
    },
    {
        title: 'Кол-во сделок',
        dataIndex: 'dealsCount',
        key: 'dealsCount',
        sorter: (a, b) => a.dealsCount - b.dealsCount,
    },
    {
        title: 'Общая сумма',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        sorter: (a, b) => a.totalAmount - b.totalAmount,
        render: (v: number) => formatAmount(v),
    },
];

export const DealsStageReport = () => {
    const {period, applied, handleFiltersChange, handlePeriodChange} = useReportFilters();
    const {data = [], isLoading, isError} = useGetDealsStageReportQuery(applied);

    return (
        <>
            <ReportToolbar
                period={period}
                onPeriodChange={handlePeriodChange}
                onFiltersChange={handleFiltersChange}
                reportName="deals-stage"
                filters={applied}
            />
            {isError && <ApiErrorMessage message="Не удалось загрузить отчёт по этапам сделок." />}
            <Table
                columns={columns}
                dataSource={data}
                rowKey="stage"
                loading={isLoading}
                size="small"
                pagination={{pageSize: PAGE_SIZE, showSizeChanger: false, showTotal: (t) => `Всего: ${t}`}}
            />
        </>
    );
};
