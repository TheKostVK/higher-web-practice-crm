import {BlockTitle} from '@/widgets/mainDashboard/desktop/ui/blockTitle';
import {type TDashboardTopDeal, useGetTopDealsQuery} from '@/entities/dashboard';
import {Button, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {DEAL_STATUS_LABELS, type TDealStatus} from '@/entities/deal';
import {CellVariant} from '@/widgets/mainDashboard/desktop/ui/cellVariant/CellVariant.tsx';
import {formatAmount, formatDate} from '@/shared/lib/formatters';
import {useOpenModal} from '@/shared/lib/modalRouting';

import Styles from './activityDeals.module.css';

const columns: ColumnsType<TDashboardTopDeal> = [
  {
    dataIndex: 'title',
    width: '40%',
  },
  {
    dataIndex: 'clientName',
    width: '20%',
    render: (value: string) => {
      return <CellVariant variant={'secondary'}>{value}</CellVariant>;
    },
  },
  {
    dataIndex: 'amount',
    width: '10%',
    render: (value: number) => {
      return <CellVariant variant={'bold'}>{formatAmount(value)}</CellVariant>;
    },
  },
  {
    dataIndex: 'status',
    width: '13%',
    render: (value: TDealStatus) => {
      switch (value) {
        case 'in_progress': {
          return <CellVariant variant={'primary'}>{DEAL_STATUS_LABELS[value]}</CellVariant>;
        }
        case 'completed': {
          return <CellVariant variant={'completed'}>{DEAL_STATUS_LABELS[value]}</CellVariant>;
        }
        case 'cancelled': {
          return <CellVariant variant={'cancelled'}>{DEAL_STATUS_LABELS[value]}</CellVariant>;
        }
        default: {
          return <CellVariant variant={'default'}>{DEAL_STATUS_LABELS[value]}</CellVariant>;
        }
      }
    },
  },
  {
    dataIndex: 'createdAt',
    width: '17%',
    align: 'right',
    render: (value: string) => {
      return <CellVariant variant={'secondary'}>{formatDate(value, 'long')}</CellVariant>;
    },
  },
];

export const ActivityDeals = () => {
  const {data: deals = [], isLoading} = useGetTopDealsQuery();
  const openModal = useOpenModal();

  return (
    <div className={Styles.section}>
      <div className={Styles.content}>
        <BlockTitle title={'Топ 10 активных сделок'} />
        <Table
          columns={columns}
          dataSource={deals}
          loading={isLoading}
          rowKey="id"
          size="small"
          rowHoverable={false}
          showHeader={false}
          pagination={false}
          rowClassName={(record) => (record.status === 'in_progress' ? Styles.rowInProgress : '')}
        />
      </div>

      <Button type="primary" onClick={() => openModal({entity: 'deal', mode: 'create'})}>
        Новая сделка
      </Button>
    </div>
  );
};
