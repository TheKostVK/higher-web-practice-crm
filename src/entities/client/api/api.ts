import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {
    TClient,
    TClientListFilters,
    TClientListRow,
    TCreateClientPayload,
    TUpdateClientByIdPayload,
} from '../types';
import {dashboardApi} from '@/entities/dashboard';
import {getApiBaseUrl} from '@/shared/api';

const invalidateDashboard = async (
    queryFulfilled: Promise<unknown>,
    dispatch: (action: ReturnType<typeof dashboardApi.util.invalidateTags>) => unknown,
) => {
    try {
        await queryFulfilled;
        dispatch(dashboardApi.util.invalidateTags(['Dashboard']));
    } catch {
        return;
    }
};

const isDateInRange = (date: string, from?: string, to?: string) => {
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

const filterClients = (clients: TClient[], filters: TClientListFilters = {}): TClientListRow[] => {
    const normalizedSearch = filters.search?.trim().toLowerCase();

    const filtered = clients.filter((client) => {
        const matchesSearch =
            !normalizedSearch ||
            [client.name, client.phone, client.email, client.company, client.website, client.comment].some((value) =>
                value?.toLowerCase().includes(normalizedSearch),
            );
        const matchesDeleted =
            filters.deleted === undefined ? client.deleted !== true : client.deleted === filters.deleted;
        const matchesCreator =
            !filters.createdBy && !filters.managerId
                ? true
                : client.createdBy === (filters.createdBy || filters.managerId);

        return (
            matchesSearch &&
            matchesDeleted &&
            matchesCreator &&
            isDateInRange(client.createdAt, filters.createdFrom, filters.createdTo)
        );
    });

    if (filters.sortBy) {
        filtered.sort((left, right) => compareValues(left[filters.sortBy!], right[filters.sortBy!], filters.order));
    }

    return paginate(filtered, filters.page, filters.limit);
};

export const clientApi = createApi({
    reducerPath: 'clientApi',
    baseQuery: fetchBaseQuery({baseUrl: getApiBaseUrl()}),
    tagTypes: ['TClient'],
    endpoints: (builder) => ({
        getClients: builder.query<TClientListRow[], TClientListFilters | void>({
            async queryFn(filters, _api, _extraOptions, fetchWithBQ) {
                const result = await fetchWithBQ('/clients');

                if (result.error) {
                    return {error: result.error};
                }

                return {data: filterClients(result.data as TClient[], filters || {})};
            },
            providesTags: (result) =>
                result
                    ? [...result.map(({id}) => ({type: 'TClient' as const, id})), {type: 'TClient', id: 'LIST'}]
                    : [{type: 'TClient', id: 'LIST'}],
        }),
        getClientById: builder.query<TClient, string>({
            query: (clientId) => `/clients/${clientId}`,
            providesTags: (_result, _error, clientId) => [{type: 'TClient', id: clientId}],
        }),
        createClient: builder.mutation<TClient, TCreateClientPayload & {createdBy: string}>({
            query: (client) => ({
                url: '/clients',
                method: 'POST',
                body: {
                    id: crypto.randomUUID(),
                    ...client,
                    createdAt: new Date().toISOString(),
                    deleted: false,
                },
            }),
            invalidatesTags: [{type: 'TClient', id: 'LIST'}],
            onQueryStarted: (_arg, {dispatch, queryFulfilled}) => invalidateDashboard(queryFulfilled, dispatch),
        }),
        updateClient: builder.mutation<TClient, TUpdateClientByIdPayload>({
            query: ({id, data}) => ({
                url: `/clients/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (_result, _error, {id}) => [
                {type: 'TClient', id},
                {type: 'TClient', id: 'LIST'},
            ],
            onQueryStarted: (_arg, {dispatch, queryFulfilled}) => invalidateDashboard(queryFulfilled, dispatch),
        }),
        deleteClient: builder.mutation<TClient, string>({
            query: (clientId) => ({
                url: `/clients/${clientId}`,
                method: 'PATCH',
                body: {deleted: true},
            }),
            invalidatesTags: (_result, _error, clientId) => [
                {type: 'TClient', id: clientId},
                {type: 'TClient', id: 'LIST'},
            ],
            onQueryStarted: (_arg, {dispatch, queryFulfilled}) => invalidateDashboard(queryFulfilled, dispatch),
        }),
    }),
});

export const {
    useGetClientsQuery,
    useGetClientByIdQuery,
    useCreateClientMutation,
    useUpdateClientMutation,
    useDeleteClientMutation,
} = clientApi;
