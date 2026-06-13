import type {TClientActivityReportRow} from "@/entities/reports";
import type {TReportCardItem} from "@/widgets/reportsContent/ui/reportCards";

export const getClientActivityCards = (data: TClientActivityReportRow[]): TReportCardItem[] =>
    data.map((row) => ({
        id: row.clientId,
        title: row.clientName,
        meta: `id ${row.clientId}`,
        fields: [
            {label: 'Сделок', value: row.dealsCount},
            {label: 'Задач завершено', value: row.completedTasks},
        ],
    }));