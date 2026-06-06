import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {TClient} from '../../client';
import type {TDeal} from '../../deal';
import type {TTask} from '../../task';
import type {
  TDashboardData,
  TDashboardFilters,
  TDashboardMetricCase,
  TDashboardMetric,
  TDashboardRecentTask,
  TDashboardTopClient,
  TDashboardTopDeal
} from '../types';

const API_BASE_URL = 'http://localhost:3001';

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const getDateBoundaries = () => {
  const now = new Date();
  const today = startOfDay(now);
  const yesterday = new Date(today);
  const week = new Date(today);
  const previousWeek = new Date(today);
  const month = new Date(today);
  const previousMonth = new Date(today);
  const quarter = new Date(today);
  const previousQuarter = new Date(today);

  yesterday.setDate(today.getDate() - 1);
  week.setDate(today.getDate() - 7);
  previousWeek.setDate(today.getDate() - 14);
  month.setMonth(today.getMonth() - 1);
  previousMonth.setMonth(today.getMonth() - 2);
  quarter.setMonth(today.getMonth() - 3);
  previousQuarter.setMonth(today.getMonth() - 6);

  return {today, yesterday, week, previousWeek, month, previousMonth, quarter, previousQuarter};
};

const getMetricCase = (currentValue: number, previousValue: number): TDashboardMetricCase => {
  if (currentValue > previousValue) {
    return 'increase';
  }

  if (currentValue < previousValue) {
    return 'decrease';
  }

  return 'noChange';
};

const countByDate = <T>(
  items: T[],
  getDate: (item: T) => string | undefined,
): TDashboardMetric => {
  const {today, yesterday, week, previousWeek, month, previousMonth, quarter, previousQuarter} = getDateBoundaries();
  const getTime = (item: T) => {
    const date = getDate(item);

    return date ? new Date(date).getTime() : 0;
  };
  const countFrom = (date: Date) => items.filter((item) => getTime(item) >= date.getTime()).length;
  const countBetween = (from: Date, to: Date) => items.filter((item) => {
    const time = getTime(item);

    return time >= from.getTime() && time < to.getTime();
  }).length;

  const toDay = countFrom(today);
  const previousDay = countBetween(yesterday, today);
  const weekValue = countFrom(week);
  const previousWeekValue = countBetween(previousWeek, week);
  const monthValue = countFrom(month);
  const previousMonthValue = countBetween(previousMonth, month);
  const quarterValue = countFrom(quarter);
  const previousQuarterValue = countBetween(previousQuarter, quarter);

  return {
    total: {
      name: 'total',
      value: items.length,
      case: 'noChange',
    },
    toDay: {
      name: 'toDay',
      value: toDay,
      case: getMetricCase(toDay, previousDay),
    },
    week: {
      name: 'week',
      value: weekValue,
      case: getMetricCase(weekValue, previousWeekValue),
    },
    month: {
      name: 'month',
      value: monthValue,
      case: getMetricCase(monthValue, previousMonthValue),
    },
    quarter: {
      name: 'quarter',
      value: quarterValue,
      case: getMetricCase(quarterValue, previousQuarterValue),
    },
  };
};

const getDashboardData = (
  clients: TClient[],
  deals: TDeal[],
  tasks: TTask[],
  filters: TDashboardFilters = {},
): TDashboardData => {
  const filteredClients = filters.managerId
    ? clients.filter((client) => client.createdBy === filters.managerId)
    : clients;
  const filteredDeals = filters.managerId
    ? deals.filter((deal) => deal.createdBy === filters.managerId)
    : deals;
  const filteredTasks = filters.managerId
    ? tasks.filter((task) => task.assigneeId === filters.managerId || task.createdBy === filters.managerId)
    : tasks;
  const activeDeals = filteredDeals.filter((deal) => deal.status === 'new' || deal.status === 'in_progress');
  const completedDeals = filteredDeals.filter((deal) => deal.status === 'completed');
  const clientsById = new Map(clients.map((client) => [client.id, client]));
  const dealsById = new Map(deals.map((deal) => [deal.id, deal]));

  const topClients: TDashboardTopClient[] = filteredClients
    .map((client) => ({
      ...client,
      dealsCount: filteredDeals.filter((deal) => deal.clientId === client.id).length,
    }))
    .sort((left, right) => right.dealsCount - left.dealsCount)
    .slice(0, 10);

  const topDeals: TDashboardTopDeal[] = [...filteredDeals]
    .sort((left, right) => right.amount - left.amount)
    .slice(0, 10)
    .map((deal) => ({
      id: deal.id,
      title: deal.title,
      amount: deal.amount,
      status: deal.status,
      createdAt: deal.createdAt,
      clientName: clientsById.get(deal.clientId)?.name || '',
    }));

  const recentTasks: TDashboardRecentTask[] = [...filteredTasks]
    .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())
    .slice(0, 10)
    .map((task) => ({
      id: task.id,
      title: task.title,
      status: task.status,
      dueDate: task.dueDate,
      createdAt: task.createdAt,
      dealTitle: task.dealId ? dealsById.get(task.dealId)?.title : undefined,
    }));

  return {
    stats: {
      clients: countByDate(filteredClients, (client) => client.createdAt),
      activeDeals: countByDate(activeDeals, (deal) => deal.createdAt),
      completedDeals: countByDate(completedDeals, (deal) => deal.completedAt || deal.createdAt),
    },
    topClients,
    topDeals,
    recentTasks,
  };
};

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({baseUrl: API_BASE_URL}),
  tagTypes: ['Dashboard'],
  endpoints: (builder) => ({
    getDashboardStats: builder.query<TDashboardData['stats'], TDashboardFilters | void>({
      query: (filters) => ({
        url: '/dashboardStats',
        params: filters?.managerId || filters?.period
          ? {
            managerId: filters.managerId,
            period: filters.period,
          }
          : undefined,
      }),
      providesTags: [{type: 'Dashboard', id: 'STATS'}],
    }),
    getDashboardData: builder.query<TDashboardData, TDashboardFilters | void>({
      async queryFn(filters, _api, _extraOptions, fetchWithBQ) {
        const clientsResult = await fetchWithBQ('/clients');

        if (clientsResult.error) {
          return {error: clientsResult.error};
        }

        const dealsResult = await fetchWithBQ('/deals');

        if (dealsResult.error) {
          return {error: dealsResult.error};
        }

        const tasksResult = await fetchWithBQ('/tasks');

        if (tasksResult.error) {
          return {error: tasksResult.error};
        }

        return {
          data: getDashboardData(
            clientsResult.data as TClient[],
            dealsResult.data as TDeal[],
            tasksResult.data as TTask[],
            filters || {},
          ),
        };
      },
      providesTags: [{type: 'Dashboard', id: 'DATA'}],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetDashboardDataQuery,
} = dashboardApi;
