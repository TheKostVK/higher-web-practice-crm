import {type TOverdueTaskReportRow, useGetOverdueTasksReportQuery} from "@/entities/reports";
import type {ColumnsType} from "antd/es/table";
import {formatDate} from "@/shared/lib/formatters";
import {TASK_STATUS_LABELS, type TTaskStatus} from "@/entities/task";
import {Table, Tag} from "antd";
import {useReportFilters} from "@/widgets/reportsContent/hook";
import {ReportToolbar} from "@/widgets/reportsContent/ui/reportToolbar/ReportToolbar.tsx";
import {getOverdueTaskCards} from "@/widgets/reportsContent/lib";
import {PAGE_SIZE} from "@/widgets/reportsContent/model";
import {lazy, Suspense} from "react";
import {Preloader} from "@/shared/ui/preloader";

export type TReportViewProps = {
    isMobile?: boolean;
};

const MobileReportBody = lazy(() => import("@/widgets/reportsContent/mobile/ui/mobileReportBody").then((module) => ({
    default:
    module.MobileReportBody
})));

const columns: ColumnsType<TOverdueTaskReportRow> = [
    {title: 'ID задачи', dataIndex: 'taskId', key: 'taskId', sorter: (a, b) => a.taskId.localeCompare(b.taskId)},
    {title: 'Название задачи', dataIndex: 'title', key: 'title', sorter: (a, b) => a.title.localeCompare(b.title)},
    {
        title: 'Ответственный',
        dataIndex: 'assigneeName',
        key: 'assigneeName',
        sorter: (a, b) => a.assigneeName.localeCompare(b.assigneeName),
    },
    {
        title: 'Дата срока',
        dataIndex: 'dueDate',
        key: 'dueDate',
        sorter: (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
        render: (v: string) => formatDate(v),
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
        render: (v: TTaskStatus) => <Tag color="error">{TASK_STATUS_LABELS[v] ?? v}</Tag>,
    },
];

export const OverdueTasksReport = ({isMobile = false}: TReportViewProps) => {
    const {period, applied, handlePeriodChange} = useReportFilters();
    const {data = [], isLoading} = useGetOverdueTasksReportQuery(applied);

    return (
        <>
            <ReportToolbar
                period={period}
                onPeriodChange={handlePeriodChange}
                reportName="overdue-tasks"
                filters={applied}
            />
            {isMobile ?
                <Suspense fallback={<Preloader/>}>
                    <MobileReportBody
                        items={getOverdueTaskCards(data)}
                        emptyText="Нет просроченных задач"
                        isLoading={isLoading}
                    />
                </Suspense>
                :
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="taskId"
                    loading={isLoading}
                    size="small"
                    pagination={{pageSize: PAGE_SIZE, showSizeChanger: false, showTotal: (t) => `Всего: ${t}`}}
                />
            }
        </>
    );
};