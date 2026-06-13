import {memo} from 'react';

import {METRIC_HEADER, useGetDashboardStatsQuery} from '@/entities/dashboard';

import Styles from './summaryInfo.module.css';
import {StatsTableRow} from './ui/statsTableRow';
import {TableHeader} from '@/shared/ui/table';
import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';

export const SummaryInfo = memo(() => {
    const {data: stats, isLoading, isError} = useGetDashboardStatsQuery();

    const metricsHeader: string[] = ['', ...Object.values(METRIC_HEADER)];

    if (isError) {
        return <ApiErrorMessage message="Не удалось загрузить сводную статистику." />;
    }

    return (
        <table className={Styles.summaryInfo}>
            <thead className={Styles.table__head}>
                <TableHeader dataSource={metricsHeader}/>
            </thead>
            <tbody className={Styles.table__body}>
                <StatsTableRow title={'Клиенты'} data={stats?.clients} isLoading={isLoading}/>
                <StatsTableRow title={'Активные сделки'} data={stats?.activeDeals} isLoading={isLoading}/>
                <StatsTableRow title={'Завершённые сделки'} data={stats?.completedDeals} isLoading={isLoading}/>
            </tbody>
        </table>
    );
});
