import {useState} from 'react';
import type {ColumnsType} from 'antd/es/table';

import {TASK_STATUS_LABELS, useGetTasksQuery} from '@/entities/task';
import type {TTaskListRow, TTaskSortField, TTaskStatus} from '@/entities/task';
import {formatDate} from '@/shared/lib/formatters';
import {useOpenModalRoute} from '@/shared/lib/modalRoute';
import {DesktopTableList} from '@/shared/ui/desktopTableList';
import {StatusTag} from '@/shared/ui/statusTag';

import {STATUS_FILTER_OPTIONS, TASK_STATUS_COLORS} from "@/widgets/tasksList/model";
import {useTableSort} from "@/shared/lib/helpers";

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
        render: (value: TTaskStatus) => (
            <StatusTag color={TASK_STATUS_COLORS[value]} label={TASK_STATUS_LABELS[value]}/>
        ),
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
    const {sortBy, order, handleTableChange} = useTableSort<TTaskSortField, TTaskListRow>();
    const openTaskModal = useOpenModalRoute();

    const {data: tasks = [], isFetching, isError} = useGetTasksQuery({
        search: search || undefined,
        status: statusFilter || undefined,
        sortBy,
        order,
    });

    const handleRowClick = (task: TTaskListRow) => {
        openTaskModal('tasks', task.id);
    };

    const handleAddClick = () => {
        openTaskModal('tasks');
    };

    return (
        <DesktopTableList<TTaskListRow>
            search={search}
            onSearchChange={setSearch}
            searchPlaceholder="Поиск по задачам..."
            statusFilter={{
                value: statusFilter,
                options: STATUS_FILTER_OPTIONS,
                onChange: (value) => setStatusFilter(value as TTaskStatus | ''),
            }}
            addButtonText="Новая задача"
            onAddClick={handleAddClick}
            isError={isError}
            errorMessage="Не удалось загрузить список задач."
            columns={columns}
            dataSource={tasks}
            loading={isFetching}
            onChange={handleTableChange}
            onRowClick={handleRowClick}
        />
    );
};
