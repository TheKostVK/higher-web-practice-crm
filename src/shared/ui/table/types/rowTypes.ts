import type {ReactNode} from 'react';

export type TRowSize = 'small' | 'medium' | 'large';

export type TTableCell = ReactNode;

export type TTableRowData = TTableCell[] | Record<string, TTableCell>;

export type TTableRowProps<T extends TTableRowData = TTableRowData> = {
    dataSource: T | undefined;
    size?: TRowSize;
    rowTitle?: string;
};

export type TTableDataSourceItem<T extends TTableRowData = TTableRowData> = T | TTableRowProps<T>;
