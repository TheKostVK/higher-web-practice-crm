import {useState} from 'react';
import type {TableProps} from 'antd';

import {antdOrderToApi, type TSortOrder} from './antdOrderToApi';

/**
 * Хранит параметры сортировки таблицы Ant Design и преобразует их в формат API.
 */
export const useTableSort = <
    TSortField extends string,
    TRecord = Record<string, unknown>,
>() => {
    const [sortBy, setSortBy] = useState<TSortField | undefined>();
    const [order, setOrder] = useState<TSortOrder>();

    const handleTableChange: NonNullable<TableProps<TRecord>['onChange']> = (
        _pagination,
        _filters,
        sorter,
    ) => {
        const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter;

        setSortBy(singleSorter?.columnKey as TSortField | undefined);
        setOrder(antdOrderToApi(singleSorter?.order));
    };

    return {sortBy, order, handleTableChange};
};
