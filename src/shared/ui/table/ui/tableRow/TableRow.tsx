import Styles from './tableRow.module.css';
import {memo} from 'react';
import type {TTableRowData, TRowSize, TTableRowProps} from '@/shared/ui/table/types/rowTypes.ts';

const sizeClassName: Record<TRowSize, string> = {
    small: Styles['tableRow--small'],
    medium: Styles['tableRow--medium'],
    large: Styles['tableRow--large'],
};

const getCells = (dataSource: TTableRowData) => (Array.isArray(dataSource) ? dataSource : Object.values(dataSource));

export const TableRow = memo(<T extends TTableRowData>({dataSource, size = 'medium', rowTitle}: TTableRowProps<T>) => {
    if (!dataSource) {
        return (
            <tr className={`${Styles.tableRow} ${sizeClassName[size]}`}>
                <td className={Styles.tableRow__cell} colSpan={6}>
          Отсутствует информация
                </td>
            </tr>
        );
    }

    return (
        <tr className={`${Styles.tableRow} ${sizeClassName[size]}`}>
            {rowTitle && (
                <th className={Styles.tableRow__title} scope="row">
                    {rowTitle}
                </th>
            )}
            {getCells(dataSource).map((item, index) => (
                <td key={index} className={Styles.tableRow__cell}>
                    {item}
                </td>
            ))}
        </tr>
    );
});
