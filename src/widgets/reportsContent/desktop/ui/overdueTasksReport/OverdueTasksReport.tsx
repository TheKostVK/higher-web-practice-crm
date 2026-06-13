import {type TOverdueTaskReportRow, useGetOverdueTasksReportQuery} from "@/entities/reports";
import type {ColumnsType} from "antd/es/table";
import {formatDate} from "@/shared/lib/formatters";
import {TASK_STATUS_LABELS, type TTaskStatus} from "@/entities/task";
import {Table} from "antd";
import {StatusTag} from "@/shared/ui/statusTag";
import {useReportFilters} from "@/widgets/reportsContent/hook";
import {ReportToolbar} from "@/widgets/reportsContent/ui/reportToolbar/ReportToolbar.tsx";
import {PAGE_SIZE} from "@/widgets/reportsContent/model";
import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';

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
        render: (v: TTaskStatus) => <StatusTag color="error" label={TASK_STATUS_LABELS[v] ?? v}/>,
    },
];

export const OverdueTasksReport = () => {
    const {period, applied, handlePeriodChange} = useReportFilters();
    const {data = [], isLoading, isError} = useGetOverdueTasksReportQuery(applied);

    return (
        <>
            <ReportToolbar
                period={period}
                onPeriodChange={handlePeriodChange}
                reportName="overdue-tasks"
                filters={applied}
            />
            {isError && <ApiErrorMessage message="Не удалось загрузить отчёт по просроченным задачам." />}
            <Table
                columns={columns}
                dataSource={data}
                rowKey="taskId"
                loading={isLoading}
                size="small"
                pagination={{pageSize: PAGE_SIZE, showSizeChanger: false, showTotal: (t) => `Всего: ${t}`}}
            />
        </>
    );
};
