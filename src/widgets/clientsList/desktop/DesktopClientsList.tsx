import {useState} from 'react';
import {Button, Input, Table} from 'antd';
import type {ColumnsType, TableProps} from 'antd/es/table';

import {useGetClientsQuery} from '@/entities/client';
import type {TClientListRow, TClientSortField} from '@/entities/client';
import {formatDate} from '@/shared/lib/formatters';
import {useOpenModalRoute} from '@/shared/lib/modalRoute';
import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';

import Styles from './desktop.module.css';
import {antdOrderToApi, type TSortOrder} from "@/shared/lib/helpers";
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
    const [sortBy, setSortBy] = useState<TClientSortField | undefined>();
    const [order, setOrder] = useState<TSortOrder>();
    const openClientModal = useOpenModalRoute();

    const {data: clients = [], isFetching, isError} = useGetClientsQuery({
        search: search || undefined,
        sortBy,
        order,
    });

    const handleTableChange: TableProps<TClientListRow>['onChange'] = (_pagination, _filters, sorter) => {
        const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter;

        setSortBy(singleSorter?.columnKey as TClientSortField | undefined);
        setOrder(antdOrderToApi(singleSorter?.order));
    };

    const handleRowClick = (client: TClientListRow) => {
        openClientModal('clients', client.id);
    };

    const handleAddClick = () => {
        openClientModal('clients');
    };

    return (
        <div className={Styles.desktopClients}>
            <div className={Styles.desktopClients__toolbar}>
                <Input.Search
                    className={Styles.desktopClients__search}
                    placeholder="Поиск по клиентам..."
                    allowClear
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button className={Styles.desktopClients__addButton} type="primary" onClick={handleAddClick}>
                    Новый клиент
                </Button>
            </div>
            {isError && <ApiErrorMessage message="Не удалось загрузить список клиентов." />}

            <Table
                className={Styles.desktopClients__table}
                columns={columns}
                dataSource={clients}
                rowKey="id"
                loading={isFetching}
                size="small"
                onChange={handleTableChange}
                onRow={(record) => ({onClick: () => handleRowClick(record)})}
                pagination={{pageSize: 20, showSizeChanger: false}}
                rowClassName={(record) => (record.deleted ? 'ant-table-row-disabled' : '')}
            />
        </div>
    );
};
