import type {TRowSize, TTableDataSourceItem, TTableRowData} from '@/shared/ui/table/types/rowTypes.ts';

export type TTableProps<T extends TTableRowData = TTableRowData> = {
    columns?: string[];
    dataSource: TTableDataSourceItem<T>[];
    size?: TRowSize;
    isLoading?: boolean;
};
