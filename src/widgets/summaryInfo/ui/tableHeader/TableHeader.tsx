import {Skeleton} from 'antd';
import Styles from './tableHeader.module.css';
import type {TDashboardMetric, TDashboardMetricCase} from '@/entities/dashboard';

type TTableRowProps = {
    title: string;
    data: TDashboardMetric | undefined;
    isLoading: boolean;
};

const caseClassName: Record<TDashboardMetricCase, string> = {
    increase: Styles.tableRow__cell_green,
    decrease: Styles.tableRow__cell_red,
    noChange: Styles.tableRow__cell_noChange,
};

export const TableHeader = ({title, data, isLoading = false}: TTableRowProps) => {
    if (isLoading) {
        return <Skeleton.Input active size="small" block/>;
    }

    if (!data) {
        return (
            <tr className={Styles.tableRow}>
                <td className={Styles.tableRow__cell}>Отсутствует информация</td>
            </tr>
        );
    }

    return (
        <tr className={Styles.tableRow}>
            <td className={Styles.tableRow__title}>
                {title}
            </td>
            {Object.values(data).map((item, index) => (
                <td
                    key={item.name}
                    className={`${Styles.tableRow__cell} ${index !== 0 ? caseClassName[item.case] : Styles.tableRow__cell_value}`}
                >
                    {item.value}
                </td>
            ))}
        </tr>
    );
};