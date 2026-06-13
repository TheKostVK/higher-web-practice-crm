import {useState} from 'react';
import {Button, Input, Select, Table, Tag} from 'antd';
import type {ColumnsType, TableProps} from 'antd/es/table';

import {TASK_STATUS_LABELS, useGetTasksQuery} from '@/entities/task';
import type {TTaskListRow, TTaskSortField, TTaskStatus} from '@/entities/task';
import {formatDate} from '@/shared/lib/formatters';
import {useOpenModalRoute} from '@/shared/lib/modalRoute';
import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';

import Styles from './desktop.module.css';
import {STATUS_FILTER_OPTIONS, TASK_STATUS_COLORS} from "@/widgets/tasksList/model";
import {antdOrderToApi, type TSortOrder} from "@/shared/lib/helpers";

const columns: ColumnsType<TTaskListRow> = [
    {
        title: 'Название',
        dataIndex: 'title',
        key: 'title',
        sorter: true,
    },
    {
        title: 'Сделка',
        dataIndex: 'dealTitle',
        key: 'dealId',
        sorter: true,
        render: (value: string) => value || '—',
    },
    {
        title: 'Описание',
        dataIndex: 'description',
        key: 'description',
        render: (value: string) => value || '—',
    },
    {
        title: 'Выполнить до',
        dataIndex: 'dueDate',
        key: 'dueDate',
        sorter: true,
        render: (value: string) => formatDate(value),
    },
    {
        title: 'Исполнитель',
        dataIndex: 'assigneeName',
        key: 'assigneeId',
        sorter: true,
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
        sorter: true,
        render: (value: TTaskStatus) => <Tag color={TASK_STATUS_COLORS[value]}>{TASK_STATUS_LABELS[value]}</Tag>,
    },
    {
        title: 'Дата создания',
        dataIndex: 'createdAt',
        key: 'createdAt',
        sorter: true,
        render: (value: string) => formatDate(value),
    },
];

/**
 * Десктопный список задач с таблицей, фильтрами и сортировкой.
 */
export const DesktopTasksList = () => {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<TTaskStatus | ''>('');
    const [sortBy, setSortBy] = useState<TTaskSortField | undefined>();
    const [order, setOrder] = useState<TSortOrder>();
    const openTaskModal = useOpenModalRoute();

    const {data: tasks = [], isFetching, isError} = useGetTasksQuery({
        search: search || undefined,
        status: statusFilter || undefined,
        sortBy,
        order,
    });

    const handleTableChange: TableProps<TTaskListRow>['onChange'] = (_pagination, _filters, sorter) => {
        const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter;

        setSortBy(singleSorter?.columnKey as TTaskSortField | undefined);
        setOrder(antdOrderToApi(singleSorter?.order));
    };

    const handleRowClick = (task: TTaskListRow) => {
        openTaskModal('tasks', task.id);
    };

    const handleAddClick = () => {
        openTaskModal('tasks');
    };

    return (
        <div className={Styles.desktopTasks}>
            <div className={Styles.desktopTasks__toolbar}>
                <Input.Search
                    className={Styles.desktopTasks__search}
                    placeholder="Поиск по задачам..."
                    allowClear
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Select
                    className={Styles.desktopTasks__statusFilter}
                    options={STATUS_FILTER_OPTIONS}
                    value={statusFilter}
                    onChange={(value) => setStatusFilter(value as TTaskStatus | '')}
                />
                <Button className={Styles.desktopTasks__addButton} type="primary" onClick={handleAddClick}>
                    Новая задача
                </Button>
            </div>
            {isError && <ApiErrorMessage message="Не удалось загрузить список задач." />}

            <Table
                className={Styles.desktopTasks__table}
                columns={columns}
                dataSource={tasks}
                rowKey="id"
                loading={isFetching}
                size="small"
                onChange={handleTableChange}
                onRow={(record) => ({onClick: () => handleRowClick(record)})}
                pagination={{pageSize: 20, showSizeChanger: false}}
            />
        </div>
    );
};
