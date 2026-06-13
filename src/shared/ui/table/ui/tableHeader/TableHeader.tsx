import Styles from './tableHeader.module.css';
import {memo} from 'react';
import type {TTableHeaderProps} from '@/shared/ui/table/types/headerTypes.ts';

export const TableHeader = memo(({dataSource}: TTableHeaderProps) => {
    if (!dataSource) {
        return (
            <tr className={Styles.tableRow}>
                <th className={Styles.tableRow__cell} scope="col">
                    Отсутствует информация
                </th>
            </tr>
        );
    }

    return (
        <tr className={Styles.tableRow}>
            {Object.values(dataSource).map((item) => (
                <th key={item} className={`${Styles.tableRow__cell}`} scope="col">
                    {item}
                </th>
            ))}
        </tr>
    );
});
