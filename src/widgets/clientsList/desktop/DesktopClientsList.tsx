import {useState} from 'react';
import type {ColumnsType} from 'antd/es/table';

import {useGetClientsQuery} from '@/entities/client';
import type {TClientListRow, TClientSortField} from '@/entities/client';
import {formatDate} from '@/shared/lib/formatters';
import {useOpenModalRoute} from '@/shared/lib/modalRoute';
import {DesktopTableList} from '@/shared/ui/desktopTableList';

import {useTableSort} from "@/shared/lib/helpers";
import {ActionsCell} from "@/widgets/clientsList/desktop/ui/actionsCell";

const columns: ColumnsType<TClientListRow> = [
    {
        title: 'Имя',
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        render: (value: string, record) => (record.deleted ? <s>{value}</s> : value),
    },
    {
        title: 'Телефон',
        dataIndex: 'phone',
        key: 'phone',
        sorter: true,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        sorter: true,
    },
    {
        title: 'Компания',
        dataIndex: 'company',
        key: 'company',
        sorter: true,
    },
    {
        title: 'Сайт',
        dataIndex: 'website',
        key: 'website',
        sorter: true,
        render: (value: string) => value || '—',
    },
    {
        title: 'Дата добавления',
        dataIndex: 'createdAt',
        key: 'createdAt',
        sorter: true,
        render: (value: string) => formatDate(value),
    },
    {
        title: 'Комментарий',
        dataIndex: 'comment',
        key: 'comment',
        sorter: true,
        render: (value: string) => value || '—',
    },
    {
        title: '',
        key: 'actions',
        width: 80,
        render: (_value, record) => (!record.deleted ? <ActionsCell record={record}/> : null),
    },
];

/**
 * Десктопный список клиентов с таблицей, фильтрами и сортировкой.
 */
export const DesktopClientsList = () => {
    const [search, setSearch] = useState('');
    const {sortBy, order, handleTableChange} = useTableSort<TClientSortField>();
    const openClientModal = useOpenModalRoute();

    const {data: clients = [], isFetching, isError} = useGetClientsQuery({
        search: search || undefined,
        sortBy,
        order,
    });

    const handleRowClick = (client: TClientListRow) => {
        openClientModal('clients', client.id);
    };

    const handleAddClick = () => {
        openClientModal('clients');
    };

    return (
        <DesktopTableList<TClientListRow>
            search={search}
            onSearchChange={setSearch}
            searchPlaceholder="Поиск по клиентам..."
            addButtonText="Новый клиент"
            onAddClick={handleAddClick}
            isError={isError}
            errorMessage="Не удалось загрузить список клиентов."
            columns={columns}
            dataSource={clients}
            loading={isFetching}
            onChange={handleTableChange}
            onRowClick={handleRowClick}
            rowClassName={(record) => (record.deleted ? 'ant-table-row-disabled' : '')}
        />
    );
};
