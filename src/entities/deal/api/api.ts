import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {TClient} from '../../client';
import type {TCreateDealPayload, TDeal, TDealListFilters, TDealListRow, TUpdateDealByIdPayload} from '../types';
import {getApiBaseUrl} from '@/shared/api';

const isDateInRange = (date: string | undefined, from?: string, to?: string) => {
    if (!date) {
        return !from && !to;
    }

    const value = new Date(date).getTime();

    return (!from || value >= new Date(from).getTime()) && (!to || value <= new Date(to).getTime());
};

const compareValues = (left: unknown, right: unknown, order: 'asc' | 'desc' = 'asc') => {
    const direction = order === 'asc' ? 1 : -1;

    if (typeof left === 'number' && typeof right === 'number') {
        return (left - right) * direction;
    }

    return String(left ?? '').localeCompare(String(right ?? ''), 'ru') * direction;
};

const paginate = <T>(items: T[], page?: number, limit?: number) => {
    if (!page || !limit) {
        return items;
    }

    const start = (page - 1) * limit;

    return items.slice(start, start + limit);
};

const getDealRows = (deals: TDeal[], clients: TClient[], filters: TDealListFilters = {}): TDealListRow[] => {
    const clientsById = new Map(clients.map((client) => [client.id, client]));
    const normalizedSearch = filters.search?.trim().toLowerCase();

    const filtered = deals
        .map((deal) => ({
            ...deal,
            clientName: clientsById.get(deal.clientId)?.name || '',
        }))
        .filter((deal) => {
            const matchesSearch =
                !normalizedSearch ||
                [deal.title, deal.description, deal.clientName].some((value) =>
                    value?.toLowerCase().includes(normalizedSearch),
                );
            const matchesStatus = !filters.status || deal.status === filters.status;
            const matchesClient = !filters.clientId || deal.clientId === filters.clientId;
            const matchesCreator =
                !filters.createdBy && !filters.managerId
                    ? true
                    : deal.createdBy === (filters.createdBy || filters.managerId);
            const matchesAmount =
                (filters.amountFrom === undefined || deal.amount >= filters.amountFrom) &&
                (filters.amountTo === undefined || deal.amount <= filters.amountTo);

            return (
                matchesSearch &&
                matchesStatus &&
                matchesClient &&
                matchesCreator &&
                matchesAmount &&
                isDateInRange(deal.createdAt, filters.createdFrom, filters.createdTo) &&
                isDateInRange(deal.completedAt, filters.completedFrom, filters.completedTo)
            );
        });

    if (filters.sortBy) {
        filtered.sort((left, right) => compareValues(left[filters.sortBy!], right[filters.sortBy!], filters.order));
    }

    return paginate(filtered, filters.page, filters.limit);
};

export const dealApi = createApi({
    reducerPath: 'dealApi',
    baseQuery: fetchBaseQuery({baseUrl: getApiBaseUrl()}),
    tagTypes: ['TDeal'],
    endpoints: (builder) => ({
        getDeals: builder.query<TDealListRow[], TDealListFilters | void>({
            async queryFn(filters, _api, _extraOptions, fetchWithBQ) {
                const dealsResult = await fetchWithBQ('/deals');

                if (dealsResult.error) {
                    return {error: dealsResult.error};
                }

                const clientsResult = await fetchWithBQ('/clients');

                if (clientsResult.error) {
                    return {error: clientsResult.error};
                }

                return {
                    data: getDealRows(dealsResult.data as TDeal[], clientsResult.data as TClient[], filters || {}),
                };
            },
            providesTags: (result) =>
                result
                    ? [...result.map(({id}) => ({type: 'TDeal' as const, id})), {type: 'TDeal', id: 'LIST'}]
                    : [{type: 'TDeal', id: 'LIST'}],
        }),
        getDealById: builder.query<TDeal, string>({
            query: (dealId) => `/deals/${dealId}`,
            providesTags: (_result, _error, dealId) => [{type: 'TDeal', id: dealId}],
        }),
        createDeal: builder.mutation<TDeal, TCreateDealPayload & {createdBy: string}>({
            query: (deal) => ({
                url: '/deals',
                method: 'POST',
                body: {
                    id: crypto.randomUUID(),
                    ...deal,
                    status: deal.status ?? 'new',
                    createdAt: new Date().toISOString(),
                },
            }),
            invalidatesTags: [{type: 'TDeal', id: 'LIST'}],
        }),
        updateDeal: builder.mutation<TDeal, TUpdateDealByIdPayload>({
            query: ({id, data}) => ({
                url: `/deals/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (_result, _error, {id}) => [
                {type: 'TDeal', id},
                {type: 'TDeal', id: 'LIST'},
            ],
        }),
        completeDeal: builder.mutation<TDeal, string>({
            query: (dealId) => ({
                url: `/deals/${dealId}`,
                method: 'PATCH',
                body: {
                    status: 'completed',
                    completedAt: new Date().toISOString(),
                },
            }),
            invalidatesTags: (_result, _error, dealId) => [
                {type: 'TDeal', id: dealId},
                {type: 'TDeal', id: 'LIST'},
            ],
        }),
        deleteDeal: builder.mutation<void, string>({
            query: (dealId) => ({
                url: `/deals/${dealId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, dealId) => [
                {type: 'TDeal', id: dealId},
                {type: 'TDeal', id: 'LIST'},
            ],
        }),
    }),
});

export const {
    useGetDealsQuery,
    useGetDealByIdQuery,
    useCreateDealMutation,
    useUpdateDealMutation,
    useCompleteDealMutation,
    useDeleteDealMutation,
} = dealApi;
