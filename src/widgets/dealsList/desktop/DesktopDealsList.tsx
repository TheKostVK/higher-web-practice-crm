import {useState} from 'react';
import {Button, Input, Select, Table} from 'antd';
import type {ColumnsType, TableProps} from 'antd/es/table';

import {DEAL_STATUS_LABELS, useGetDealsQuery} from '@/entities/deal';
import type {TDealListRow, TDealSortField, TDealStatus} from '@/entities/deal';
import {formatAmount, formatDate} from '@/shared/lib/formatters';
import {useOpenModalRoute} from '@/shared/lib/modalRoute';
import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';
import {StatusTag} from '@/shared/ui/statusTag';

import Styles from './desktop.module.css';
import {antdOrderToApi, type TSortOrder} from "@/shared/lib/helpers";
import {DEAL_STATUS_COLORS, STATUS_FILTER_OPTIONS} from "@/widgets/dealsList/model";

const columns: ColumnsType<TDealListRow> = [
    {
        title: 'Название',
        dataIndex: 'title',
        key: 'title',
        sorter: true,
    },
    {
        title: 'Клиент',
        dataIndex: 'clientName',
        key: 'clientId',
        sorter: true,
    },
    {
        title: 'Описание',
        dataIndex: 'description',
        key: 'description',
        render: (value: string) => value || '—',
    },
    {
        title: 'Сумма',
        dataIndex: 'amount',
        key: 'amount',
        sorter: true,
        render: (value: number) => formatAmount(value),
    },
    {
        title: 'Этап',
        dataIndex: 'status',
        key: 'status',
        sorter: true,
        render: (value: TDealStatus) => (
            <StatusTag color={DEAL_STATUS_COLORS[value]} label={DEAL_STATUS_LABELS[value]}/>
        ),
    },
    {
        title: 'Дата создания',
        dataIndex: 'createdAt',
        key: 'createdAt',
        sorter: true,
        render: (value: string) => formatDate(value),
    },
    {
        title: 'Дата завершения',
        dataIndex: 'completedAt',
        key: 'completedAt',
        sorter: true,
        render: (value: string) => formatDate(value),
    },
];


/**
 * Десктопный список сделок с таблицей, фильтрами и сортировкой.
 */
export const DesktopDealsList = () => {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<TDealStatus | ''>('');
    const [sortBy, setSortBy] = useState<TDealSortField | undefined>();
    const [order, setOrder] = useState<TSortOrder>();
    const openDealModal = useOpenModalRoute();

    const {data: deals = [], isFetching, isError} = useGetDealsQuery({
        search: search || undefined,
        status: statusFilter || undefined,
        sortBy,
        order,
    });

    const handleTableChange: TableProps<TDealListRow>['onChange'] = (_pagination, _filters, sorter) => {
        const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter;

        setSortBy(singleSorter?.columnKey as TDealSortField | undefined);
        setOrder(antdOrderToApi(singleSorter?.order));
    };

    const handleRowClick = (deal: TDealListRow) => {
        openDealModal('deals', deal.id);
    };

    const handleAddClick = () => {
        openDealModal('deals');
    };

    return (
        <div className={Styles.desktopDeals}>
            <div className={Styles.desktopDeals__toolbar}>
                <Input.Search
                    className={Styles.desktopDeals__search}
                    placeholder="Поиск по сделкам..."
                    allowClear
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Select
                    className={Styles.desktopDeals__statusFilter}
                    options={STATUS_FILTER_OPTIONS}
                    value={statusFilter}
                    onChange={(value) => setStatusFilter(value as TDealStatus | '')}
                />
                <Button className={Styles.desktopDeals__addButton} type="primary" onClick={handleAddClick}>
                    Новая сделка
                </Button>
            </div>
            {isError && <ApiErrorMessage message="Не удалось загрузить список сделок." />}

            <Table
                className={Styles.desktopDeals__table}
                columns={columns}
                dataSource={deals}
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
