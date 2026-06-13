import type {TOverdueTaskReportRow} from '@/entities/reports';
import type {TReportCardItem} from '@/widgets/reportsContent/ui/reportCards';
import {formatDate} from '@/shared/lib/formatters';

export const getOverdueTaskCards = (data: TOverdueTaskReportRow[]): TReportCardItem[] =>
    data.map((row) => ({
        id: row.taskId,
        title: row.title,
        meta: `id ${row.taskId}`,
        status: 'Просрочена',
        tone: 'danger',
        fields: [
            {label: 'Ответственный', value: row.assigneeName},
            {label: undefined, value: formatDate(row.dueDate)},
        ],
    }));
