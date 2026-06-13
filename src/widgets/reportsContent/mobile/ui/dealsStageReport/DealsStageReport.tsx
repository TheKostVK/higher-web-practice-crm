import type {TReportViewProps} from "@/widgets/reportsContent/ui/overdueTasksReport";
import {type TDealsStageReportRow, useGetDealsStageReportQuery} from "@/entities/reports";
import type {ColumnsType} from "antd/es/table";
import {DEAL_STATUS_LABELS, type TDealStatus} from "@/entities/deal";
import {Table, Tag} from "antd";
import {formatAmount} from "@/shared/lib/formatters";
import {useReportFilters} from "@/widgets/reportsContent/hook";
import {ReportToolbar} from "@/widgets/reportsContent/ui/reportToolbar";
import {PAGE_SIZE} from "@/widgets/reportsContent/model";
import {lazy, Suspense} from "react";
import {Preloader} from "@/shared/ui/preloader";

const CompactDealsStageCards = lazy(() => import("@/widgets/reportsContent/mobile/ui/compactDealsStageCards").then((module) => ({default: module.CompactDealsStageCards})));

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

export const DealsStageReport = ({isMobile = false}: TReportViewProps) => {
    const {period, applied, handlePeriodChange} = useReportFilters();
    const {data = [], isLoading} = useGetDealsStageReportQuery(applied);

    return (
        <>
            <ReportToolbar
                period={period}
                onPeriodChange={handlePeriodChange}
                reportName="deals-stage"
                filters={applied}
            />
            {isMobile ?
                <Suspense fallback={<Preloader/>}>
                    <CompactDealsStageCards items={data} emptyText="Нет этапов" isLoading={isLoading}/>
                </Suspense>
                :
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="stage"
                    loading={isLoading}
                    size="small"
                    pagination={{pageSize: PAGE_SIZE, showSizeChanger: false, showTotal: (t) => `Всего: ${t}`}}
                />
            }
        </>
    );
};