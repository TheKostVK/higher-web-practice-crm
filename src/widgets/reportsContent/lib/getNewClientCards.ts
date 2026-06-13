import type {TNewClientReportRow} from '@/entities/reports';
import type {TReportCardItem} from '@/widgets/reportsContent/ui/reportCards';
import {formatDate} from '@/shared/lib/formatters';

export const getNewClientCards = (data: TNewClientReportRow[]): TReportCardItem[] =>
    data.map((row) => ({
        id: row.clientId,
        title: row.clientName,
        meta: `id ${row.clientId}`,
        fields: [
            {label: 'Компания', value: row.company},
            {label: 'Дата', value: formatDate(row.createdAt)},
        ],
    }));
