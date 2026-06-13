import {act, renderHook} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import {useTableSort} from './useTableSort';

type TRecord = {name: string};

const tableChangeExtra = {currentDataSource: [] as TRecord[], action: 'sort' as const};

describe('useTableSort', () => {
    it('изначально не задаёт сортировку', () => {
        const {result} = renderHook(() => useTableSort<'name', TRecord>());

        expect(result.current.sortBy).toBeUndefined();
        expect(result.current.order).toBeUndefined();
    });

    it('сохраняет поле и порядок сортировки при изменении таблицы', () => {
        const {result} = renderHook(() => useTableSort<'name', TRecord>());

        act(() => {
            result.current.handleTableChange({}, {}, {columnKey: 'name', order: 'ascend'}, tableChangeExtra);
        });

        expect(result.current.sortBy).toBe('name');
        expect(result.current.order).toBe('asc');

        act(() => {
            result.current.handleTableChange({}, {}, {columnKey: 'name', order: 'descend'}, tableChangeExtra);
        });

        expect(result.current.order).toBe('desc');
    });

    it('сбрасывает сортировку, если столбец сортировки убран', () => {
        const {result} = renderHook(() => useTableSort<'name', TRecord>());

        act(() => {
            result.current.handleTableChange({}, {}, {columnKey: 'name', order: 'ascend'}, tableChangeExtra);
        });

        act(() => {
            result.current.handleTableChange({}, {}, {}, tableChangeExtra);
        });

        expect(result.current.sortBy).toBeUndefined();
        expect(result.current.order).toBeUndefined();
    });

    it('берёт первый элемент, если передан массив сортировщиков', () => {
        const {result} = renderHook(() => useTableSort<'name', TRecord>());

        act(() => {
            result.current.handleTableChange(
                {},
                {},
                [
                    {columnKey: 'name', order: 'descend'},
                    {columnKey: 'name', order: 'ascend'},
                ],
                tableChangeExtra,
            );
        });

        expect(result.current.sortBy).toBe('name');
        expect(result.current.order).toBe('desc');
    });
});
