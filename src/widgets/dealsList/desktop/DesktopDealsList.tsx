import {useState} from 'react';
import type {ColumnsType} from 'antd/es/table';

import {DEAL_STATUS_LABELS, useGetDealsQuery} from '@/entities/deal';
import type {TDealListRow, TDealSortField, TDealStatus} from '@/entities/deal';
import {formatAmount, formatDate} from '@/shared/lib/formatters';
import {useOpenModalRoute} from '@/shared/lib/modalRoute';
import {DesktopTableList} from '@/shared/ui/desktopTableList';
import {StatusTag} from '@/shared/ui/statusTag';

import {useTableSort} from '@/shared/lib/helpers';
import {DEAL_STATUS_COLORS, STATUS_FILTER_OPTIONS} from '@/widgets/dealsList/model';

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
            <StatusTag color={DEAL_STATUS_COLORS[value]} label={DEAL_STATUS_LABELS[value]} />
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
    const {sortBy, order, handleTableChange} = useTableSort<TDealSortField, TDealListRow>();
    const openDealModal = useOpenModalRoute();

    const {
        data: deals = [],
        isFetching,
        isError,
    } = useGetDealsQuery({
        search: search || undefined,
        status: statusFilter || undefined,
        sortBy,
        order,
    });

    const handleRowClick = (deal: TDealListRow) => {
        openDealModal('deals', deal.id);
    };

    const handleAddClick = () => {
        openDealModal('deals');
    };

    return (
        <DesktopTableList<TDealListRow>
            search={search}
            onSearchChange={setSearch}
            searchPlaceholder="Поиск по сделкам..."
            statusFilter={{
                value: statusFilter,
                options: STATUS_FILTER_OPTIONS,
                onChange: (value) => setStatusFilter(value as TDealStatus | ''),
            }}
            addButtonText="Новая сделка"
            onAddClick={handleAddClick}
            isError={isError}
            errorMessage="Не удалось загрузить список сделок."
            columns={columns}
            dataSource={deals}
            loading={isFetching}
            onChange={handleTableChange}
            onRowClick={handleRowClick}
        />
    );
};
