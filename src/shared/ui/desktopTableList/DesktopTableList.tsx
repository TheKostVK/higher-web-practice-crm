import {Button, Input, Select, Table} from 'antd';
import type {ColumnsType, TableProps} from 'antd/es/table';

import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';

import Styles from './desktopTableList.module.css';

export type TDesktopTableListStatusFilter = {
    value: string;
    options: {value: string; label: string}[];
    onChange: (value: string) => void;
};

type TDesktopTableListProps<TRow extends object> = {
    search: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder: string;
    statusFilter?: TDesktopTableListStatusFilter;
    addButtonText: string;
    onAddClick: () => void;
    isError?: boolean;
    errorMessage?: string;
    columns: ColumnsType<TRow>;
    dataSource: TRow[];
    loading: boolean;
    onChange?: TableProps<TRow>['onChange'];
    onRowClick: (record: TRow) => void;
    rowClassName?: TableProps<TRow>['rowClassName'];
};

/**
 * Десктопный список с таблицей: поиск, опциональный фильтр по статусу, кнопка добавления и сортируемая таблица.
 * @param props Параметры списка.
 */
export const DesktopTableList = <TRow extends object>({
    search,
    onSearchChange,
    searchPlaceholder,
    statusFilter,
    addButtonText,
    onAddClick,
    isError,
    errorMessage,
    columns,
    dataSource,
    loading,
    onChange,
    onRowClick,
    rowClassName,
}: TDesktopTableListProps<TRow>) => (
    <div className={Styles.desktopTableList}>
        <div className={Styles.desktopTableList__toolbar}>
            <Input.Search
                className={Styles.desktopTableList__search}
                placeholder={searchPlaceholder}
                allowClear
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            {statusFilter && (
                <Select
                    className={Styles.desktopTableList__statusFilter}
                    options={statusFilter.options}
                    value={statusFilter.value}
                    onChange={statusFilter.onChange}
                />
            )}
            <Button className={Styles.desktopTableList__addButton} type="primary" onClick={onAddClick}>
                {addButtonText}
            </Button>
        </div>
        {isError && <ApiErrorMessage message={errorMessage} />}

        <Table<TRow>
            className={Styles.desktopTableList__table}
            columns={columns}
            dataSource={dataSource}
            rowKey="id"
            loading={loading}
            size="small"
            onChange={onChange}
            onRow={(record) => ({onClick: () => onRowClick(record)})}
            pagination={{pageSize: 20, showSizeChanger: false}}
            rowClassName={rowClassName}
        />
    </div>
);
