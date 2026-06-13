import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {TClient} from '../../client';
import type {TDeal} from '../../deal';
import type {TTask} from '../../task';
import type {TUser} from '../../user';
import type {
    TClientActivityReportRow,
    TDealsStageReportRow,
    TNewClientReportRow,
    TOverdueTaskReportRow,
    TReportExportPayload,
    TReportExportResult,
    TReportFilters,
    TSalesReportRow,
} from '../types';
import {getApiBaseUrl} from '@/shared/api';

const getPeriodRange = (filters: TReportFilters = {}) => {
    if (filters.dateFrom || filters.dateTo) {
        return {
            from: filters.dateFrom,
            to: filters.dateTo,
        };
    }

    if (!filters.period) {
        return {};
    }

    const to = new Date();
    const from = new Date(to);

    if (filters.period === 'week') {
        from.setDate(to.getDate() - 7);
    }

    if (filters.period === 'month') {
        from.setMonth(to.getMonth() - 1);
    }

    if (filters.period === 'quarter') {
        from.setMonth(to.getMonth() - 3);
    }

    return {
        from: from.toISOString(),
        to: to.toISOString(),
    };
};

const isDateInRange = (date: string | undefined, filters: TReportFilters = {}) => {
    if (!date) {
        return false;
    }

    const {from, to} = getPeriodRange(filters);
    const value = new Date(date).getTime();

    return (!from || value >= new Date(from).getTime()) && (!to || value <= new Date(to).getTime());
};

const isTaskOverdue = (task: TTask) => {
    if (!task.dueDate || task.status === 'completed') {
        return false;
    }

    return new Date(task.dueDate).getTime() < Date.now();
};

const filterDeals = (deals: TDeal[], filters: TReportFilters = {}) =>
    deals.filter((deal) => {
        const matchesManager = !filters.managerId || deal.createdBy === filters.managerId;
        const matchesClient = !filters.clientId || deal.clientId === filters.clientId;
        const matchesStatus = !filters.dealStatus || deal.status === filters.dealStatus;

        return matchesManager && matchesClient && matchesStatus;
    });

const getSalesReport = (deals: TDeal[], clients: TClient[], filters: TReportFilters = {}): TSalesReportRow[] => {
    const clientsById = new Map(clients.map((client) => [client.id, client]));

    return filterDeals(deals, {...filters, dealStatus: filters.dealStatus || 'completed'})
        .filter((deal) => isDateInRange(deal.completedAt, filters))
        .map((deal) => ({
            dealId: deal.id,
            title: deal.title,
            clientName: clientsById.get(deal.clientId)?.name || '',
            amount: deal.amount,
            completedAt: deal.completedAt || '',
        }))
        .sort((left, right) => new Date(right.completedAt).getTime() - new Date(left.completedAt).getTime());
};

const getDealsStageReport = (deals: TDeal[], filters: TReportFilters = {}): TDealsStageReportRow[] => {
    const rows = new Map<string, TDealsStageReportRow>();

    filterDeals(deals, filters)
        .filter((deal) => isDateInRange(deal.createdAt, filters))
        .forEach((deal) => {
            const current = rows.get(deal.status) || {
                stage: deal.status,
                dealsCount: 0,
                totalAmount: 0,
            };

            rows.set(deal.status, {
                ...current,
                dealsCount: current.dealsCount + 1,
                totalAmount: current.totalAmount + deal.amount,
            });
        });

    return Array.from(rows.values());
};

const getNewClientsReport = (clients: TClient[], filters: TReportFilters = {}): TNewClientReportRow[] =>
    clients
        .filter((client) => {
            const matchesManager = !filters.managerId || client.createdBy === filters.managerId;

            return matchesManager && isDateInRange(client.createdAt, filters);
        })
        .map((client) => ({
            clientId: client.id,
            clientName: client.name,
            company: client.company,
            createdAt: client.createdAt,
        }))
        .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime());

const getClientActivityReport = (
    clients: TClient[],
    deals: TDeal[],
    tasks: TTask[],
    filters: TReportFilters = {},
): TClientActivityReportRow[] =>
    clients
        .filter((client) => !filters.managerId || client.createdBy === filters.managerId)
        .map((client) => {
            const clientDeals = deals.filter((deal) => deal.clientId === client.id);
            const clientDealIds = new Set(clientDeals.map((deal) => deal.id));

            return {
                clientId: client.id,
                clientName: client.name,
                dealsCount: clientDeals.filter((deal) => isDateInRange(deal.createdAt, filters)).length,
                completedTasks: tasks.filter(
                    (task) =>
                        task.status === 'completed' &&
                        task.dealId &&
                        clientDealIds.has(task.dealId) &&
                        isDateInRange(task.createdAt, filters),
                ).length,
            };
        })
        .sort((left, right) => right.dealsCount - left.dealsCount);

const getOverdueTasksReport = (
    tasks: TTask[],
    users: TUser[],
    filters: TReportFilters = {},
): TOverdueTaskReportRow[] => {
    const usersById = new Map(users.map((user) => [user.id, user]));

    return tasks
        .filter((task) => {
            const matchesManager =
                !filters.managerId || task.assigneeId === filters.managerId || task.createdBy === filters.managerId;
            const matchesStatus = !filters.taskStatus || task.status === filters.taskStatus;

            return matchesManager && matchesStatus && isTaskOverdue(task) && isDateInRange(task.dueDate, filters);
        })
        .map((task) => ({
            taskId: task.id,
            title: task.title,
            assigneeName: usersById.get(task.assigneeId)?.name || '',
            dueDate: task.dueDate || '',
            status: task.status,
        }))
        .sort((left, right) => new Date(left.dueDate).getTime() - new Date(right.dueDate).getTime());
};

export const reportsApi = createApi({
    reducerPath: 'reportsApi',
    baseQuery: fetchBaseQuery({baseUrl: getApiBaseUrl()}),
    tagTypes: ['Reports'],
    endpoints: (builder) => ({
        getSalesReport: builder.query<TSalesReportRow[], TReportFilters | void>({
            async queryFn(filters, _api, _extraOptions, fetchWithBQ) {
                const dealsResult = await fetchWithBQ('/deals');
                const clientsResult = await fetchWithBQ('/clients');

                if (dealsResult.error) {
                    return {error: dealsResult.error};
                }

                if (clientsResult.error) {
                    return {error: clientsResult.error};
                }

                return {
                    data: getSalesReport(dealsResult.data as TDeal[], clientsResult.data as TClient[], filters || {}),
                };
            },
            providesTags: [{type: 'Reports', id: 'SALES'}],
        }),
        getDealsStageReport: builder.query<TDealsStageReportRow[], TReportFilters | void>({
            async queryFn(filters, _api, _extraOptions, fetchWithBQ) {
                const dealsResult = await fetchWithBQ('/deals');

                if (dealsResult.error) {
                    return {error: dealsResult.error};
                }

                return {data: getDealsStageReport(dealsResult.data as TDeal[], filters || {})};
            },
            providesTags: [{type: 'Reports', id: 'DEALS_STAGE'}],
        }),
        getNewClientsReport: builder.query<TNewClientReportRow[], TReportFilters | void>({
            async queryFn(filters, _api, _extraOptions, fetchWithBQ) {
                const clientsResult = await fetchWithBQ('/clients');

                if (clientsResult.error) {
                    return {error: clientsResult.error};
                }

                return {data: getNewClientsReport(clientsResult.data as TClient[], filters || {})};
            },
            providesTags: [{type: 'Reports', id: 'NEW_CLIENTS'}],
        }),
        getClientActivityReport: builder.query<TClientActivityReportRow[], TReportFilters | void>({
            async queryFn(filters, _api, _extraOptions, fetchWithBQ) {
                const clientsResult = await fetchWithBQ('/clients');
                const dealsResult = await fetchWithBQ('/deals');
                const tasksResult = await fetchWithBQ('/tasks');

                if (clientsResult.error) {
                    return {error: clientsResult.error};
                }

                if (dealsResult.error) {
                    return {error: dealsResult.error};
                }

                if (tasksResult.error) {
                    return {error: tasksResult.error};
                }

                return {
                    data: getClientActivityReport(
                        clientsResult.data as TClient[],
                        dealsResult.data as TDeal[],
                        tasksResult.data as TTask[],
                        filters || {},
                    ),
                };
            },
            providesTags: [{type: 'Reports', id: 'CLIENT_ACTIVITY'}],
        }),
        getOverdueTasksReport: builder.query<TOverdueTaskReportRow[], TReportFilters | void>({
            async queryFn(filters, _api, _extraOptions, fetchWithBQ) {
                const tasksResult = await fetchWithBQ('/tasks');
                const usersResult = await fetchWithBQ('/users');

                if (tasksResult.error) {
                    return {error: tasksResult.error};
                }

                if (usersResult.error) {
                    return {error: usersResult.error};
                }

                return {
                    data: getOverdueTasksReport(
                        tasksResult.data as TTask[],
                        usersResult.data as TUser[],
                        filters || {},
                    ),
                };
            },
            providesTags: [{type: 'Reports', id: 'OVERDUE_TASKS'}],
        }),
        exportReportPdf: builder.mutation<TReportExportResult, Omit<TReportExportPayload, 'format'>>({
            queryFn: ({reportName}) => ({
                data: {
                    reportName,
                    format: 'pdf',
                    createdAt: new Date().toISOString(),
                },
            }),
        }),
        exportReportXlsx: builder.mutation<TReportExportResult, Omit<TReportExportPayload, 'format'>>({
            queryFn: ({reportName}) => ({
                data: {
                    reportName,
                    format: 'xlsx',
                    createdAt: new Date().toISOString(),
                },
            }),
        }),
    }),
});

export const {
    useGetSalesReportQuery,
    useGetDealsStageReportQuery,
    useGetNewClientsReportQuery,
    useGetClientActivityReportQuery,
    useGetOverdueTasksReportQuery,
    useExportReportPdfMutation,
    useExportReportXlsxMutation,
} = reportsApi;
