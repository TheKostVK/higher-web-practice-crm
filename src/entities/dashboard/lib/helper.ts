export const METRIC_HEADER = {
    total: 'на сегодня',
    toDay: 'за сегодня',
    week: 'за неделю',
    month: 'за месяц',
    quarter: 'за квартал',
} as const;

export type MetricKey = keyof typeof METRIC_HEADER;

export const METRIC_HEADER_KEY: MetricKey[] = ['total', 'toDay', 'week', 'month', 'quarter'];
