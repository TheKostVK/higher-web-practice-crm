import {Skeleton} from 'antd';
import Styles from './cardData.module.css';
import {METRIC_HEADER, type MetricKey, type TDashboardMetric, type TDashboardMetricCase} from '@/entities/dashboard';
import {memo} from 'react';

type TTableRowProps = {
  title: string;
  data: TDashboardMetric | undefined;
  isLoading: boolean;
};

const caseClassName: Record<TDashboardMetricCase, string> = {
  increase: Styles['cell__value--green'],
  decrease: Styles['cell__value--red'],
  noChange: Styles['cell__value--noChange'],
};

const metricGroups: MetricKey[][] = [
  ['toDay', 'week'],
  ['month', 'quarter'],
];

export const CardData = memo(({title, data, isLoading = false}: TTableRowProps) => {
  if (isLoading) {
    return (
      <div className={Styles.cardData}>
        <Skeleton.Input active size="small" block />
      </div>
    );
  }

  if (!data) {
    return (
      <div className={Styles.cardData}>
        <p className={Styles.cardData__title}>{title}</p>
        <p className={Styles.cardData__empty}>Отсутствует информация</p>
      </div>
    );
  }

  const totalMetric = data.total;

  return (
    <div className={Styles.cardData}>
      <p className={Styles.cardData__title}>{title}</p>
      <div className={Styles.cardData__content}>
        <div className={Styles.cardData__total}>
          <span className={Styles.total__value}>{totalMetric.value}</span>
          <span className={Styles.cell__title}>{METRIC_HEADER[totalMetric.name]}</span>
        </div>

        {metricGroups.map((group) => (
          <div className={Styles.cardData__group} key={group.join('-')}>
            {group.map((metricKey) => {
              const item = data[metricKey];

              return (
                <div key={item.name} className={Styles['cardData__contentCell']}>
                  <span className={Styles.cell__title}>{METRIC_HEADER[item.name]}</span>
                  <span className={`${Styles.cell__value} ${caseClassName[item.case]}`}>{item.value}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
});
