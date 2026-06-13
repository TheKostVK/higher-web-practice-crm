import {useState} from 'react';
import type {SorterResult} from 'antd/es/table/interface';

import {antdOrderToApi, type TSortOrder} from './antdOrderToApi';

/**
 * Хранит параметры сортировки таблицы Ant Design и преобразует их в формат API.
 */
export const useTableSort = <TSortField extends string>() => {
    const [sortBy, setSortBy] = useState<TSortField | undefined>();
    const [order, setOrder] = useState<TSortOrder>();

    const handleTableChange = (
        _pagination: unknown,
        _filters: unknown,
        sorter: SorterResult<never> | SorterResult<never>[],
    ) => {
        const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter;

        setSortBy(singleSorter?.columnKey as TSortField | undefined);
        setOrder(antdOrderToApi(singleSorter?.order));
    };

    return {sortBy, order, handleTableChange};
};
