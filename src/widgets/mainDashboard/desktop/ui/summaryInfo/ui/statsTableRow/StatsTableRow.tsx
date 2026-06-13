import {Skeleton} from 'antd';
import Styles from './statsTableRow.module.css';
import {METRIC_HEADER_KEY, type TDashboardMetric, type TDashboardMetricCase} from '@/entities/dashboard';
import {TableRow} from '@/shared/ui/table';

type TTableRowProps = {
    title: string;
    data: TDashboardMetric | undefined;
    isLoading?: boolean;
};

const caseClassName: Record<TDashboardMetricCase, string> = {
    increase: Styles['tableRow__cell--green'],
    decrease: Styles['tableRow__cell--red'],
    noChange: Styles['tableRow__cell--noChange'],
};

const mainValueIndex = 0;

export const StatsTableRow = ({title, data, isLoading}: TTableRowProps) => {
    if (isLoading) {
        return (
            <tr className={Styles.tableRow}>
                <td className={Styles.tableRow__cell} colSpan={6}>
                    <Skeleton.Input active size="small" block />
                </td>
            </tr>
        );
    }

    if (!data) {
        return (
            <tr className={Styles.tableRow}>
                <td className={Styles.tableRow__cell} colSpan={6}>
                    Отсутствует информация
                </td>
            </tr>
        );
    }

    const rowCells = METRIC_HEADER_KEY.map((key, index) => (
        <span
            key={key}
            className={`${Styles.tableRow__cell} ${index !== mainValueIndex ? caseClassName[data[key].case] : Styles['tableRow__cell--value']}`}
        >
            {data[key].value}
        </span>
    ));

    return <TableRow rowTitle={title} dataSource={rowCells} size={'large'} />;
};
