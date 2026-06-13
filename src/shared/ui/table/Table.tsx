import type {TTableProps} from '@/shared/ui/table/types';
import {TableHeader, TableRow} from '@/shared/ui/table/ui';
import {Preloader} from '@/shared/ui/preloader';
import type {TTableDataSourceItem, TTableRowData, TTableRowProps} from '@/shared/ui/table/types/rowTypes.ts';

import Styles from './table.module.css';

const isTableRowProps = <T extends TTableRowData>(item: TTableDataSourceItem<T>): item is TTableRowProps<T> =>
  typeof item === 'object' && item !== null && !Array.isArray(item) && 'dataSource' in item;

const getRowKey = <T extends TTableRowData>(item: TTableDataSourceItem<T>, index: number) => {
  const rowData = isTableRowProps(item) ? item.dataSource : item;
  const cells = Array.isArray(rowData) ? rowData : Object.values(rowData || {});

  return `${index}-${cells.join('-')}`;
};

export const Table = <T extends TTableRowData>({
  columns,
  dataSource,
  size = 'medium',
  isLoading = false,
}: TTableProps<T>) => {
  return (
    <table className={Styles.table}>
      {columns && (
        <thead className={Styles.table__head}>
          <TableHeader dataSource={columns} />
        </thead>
      )}
      <tbody className={Styles.table__body}>
        {isLoading ? (
          <tr>
            <td colSpan={columns?.length}>
              <Preloader />
            </td>
          </tr>
        ) : (
          dataSource.map((item, index) => {
            const rowProps = isTableRowProps(item) ? item : {dataSource: item};

            return <TableRow key={getRowKey(item, index)} size={size} {...rowProps} />;
          })
        )}
      </tbody>
    </table>
  );
};
