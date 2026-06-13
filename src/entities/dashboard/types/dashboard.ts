import type {TClient} from '../../client';
import type {TDeal} from '../../deal';
import type {TTask} from '../../task';
import type {TDealStatus} from '../../deal';
import type {TTaskStatus} from '../../task';
import type {MetricKey} from '../lib/helper.ts';

export type TDashboardPeriod = 'today' | 'week' | 'month' | 'quarter';

export type TDashboardFilters = {
    period?: TDashboardPeriod;
    managerId?: string;
};

export type TDashboardMetricCase = 'increase' | 'decrease' | 'noChange';

export type TDashboardMetricHeader = 'total' | 'toDay' | 'week' | 'month' | 'quarter';

export type TDashboardMetricItem = {
    name: MetricKey;
    value: number;
    case: TDashboardMetricCase;
};

export type TDashboardMetric = {
    total: TDashboardMetricItem;
    toDay: TDashboardMetricItem;
    week: TDashboardMetricItem;
    month: TDashboardMetricItem;
    quarter: TDashboardMetricItem;
};

export type TDashboardStats = {
    clients: TDashboardMetric;
    activeDeals: TDashboardMetric;
    completedDeals: TDashboardMetric;
};

export type TDashboardTopClient = TClient & {
    dealsCount: number;
};

export type TDashboardTopDeal = Pick<TDeal, 'id' | 'title' | 'amount' | 'status' | 'createdAt'> & {
    clientName: string;
    status: TDealStatus;
};

export type TDashboardRecentTask = Pick<TTask, 'id' | 'title' | 'status' | 'dueDate' | 'createdAt'> & {
    dealTitle?: string;
    status: TTaskStatus;
};

export type TDashboardData = {
    stats: TDashboardStats;

    topClients: TDashboardTopClient[];

    topDeals: TDashboardTopDeal[];

    recentTasks: TDashboardRecentTask[];
};
