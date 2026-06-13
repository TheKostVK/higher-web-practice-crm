import {useGetDashboardStatsQuery} from '@/entities/dashboard';

import {CardData} from './ui/cardData';

import {memo} from 'react';

import Styles from './summaryInfo.module.css';
import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';

export const SummaryInfo = memo(() => {
  const {data: stats, isLoading, isError} = useGetDashboardStatsQuery();

  if (isError) {
    return <ApiErrorMessage message="Не удалось загрузить сводную статистику." />;
  }

  return (
    <div className={Styles.summaryInfo}>
      <CardData title={'Клиенты'} data={stats?.clients} isLoading={isLoading} />
      <CardData title={'Активные сделки'} data={stats?.activeDeals} isLoading={isLoading} />
      <CardData title={'Завершённые сделки'} data={stats?.completedDeals} isLoading={isLoading} />
    </div>
  );
});
