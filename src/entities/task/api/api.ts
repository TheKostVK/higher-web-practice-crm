import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {TDeal} from '../../deal';
import type {TUser} from '../../user';
import type {TCreateTaskPayload, TTask, TTaskListFilters, TTaskListRow, TUpdateTaskByIdPayload} from '../types';
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

  return String(left ?? '').localeCompare(String(right ?? ''), 'ru', {numeric: true}) * direction;
};

const paginate = <T>(items: T[], page?: number, limit?: number) => {
  if (!page || !limit) {
    return items;
  }

  const start = (page - 1) * limit;

  return items.slice(start, start + limit);
};

const isTaskOverdue = (task: TTask) => {
  if (!task.dueDate || task.status === 'completed') {
    return false;
  }

  return new Date(task.dueDate).getTime() < Date.now();
};

const getTaskRows = (
  tasks: TTask[],
  deals: TDeal[],
  users: TUser[],
  filters: TTaskListFilters = {},
): TTaskListRow[] => {
  const dealsById = new Map(deals.map((deal) => [deal.id, deal]));
  const usersById = new Map(users.map((user) => [user.id, user]));
  const normalizedSearch = filters.search?.trim().toLowerCase();

  const filtered = tasks
    .map((task) => ({
      ...task,
      dealTitle: task.dealId ? dealsById.get(task.dealId)?.title : undefined,
      assigneeName: usersById.get(task.assigneeId)?.name || '',
    }))
    .filter((task) => {
      const matchesSearch =
        !normalizedSearch ||
        [task.title, task.description, task.dealTitle, task.assigneeName].some((value) =>
          value?.toLowerCase().includes(normalizedSearch),
        );
      const matchesStatus = !filters.status || task.status === filters.status;
      const matchesDeal = !filters.dealId || task.dealId === filters.dealId;
      const matchesAssignee =
        !filters.assigneeId && !filters.managerId
          ? true
          : task.assigneeId === (filters.assigneeId || filters.managerId);
      const matchesOverdue = filters.overdue === undefined || isTaskOverdue(task) === filters.overdue;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDeal &&
        matchesAssignee &&
        matchesOverdue &&
        isDateInRange(task.dueDate, filters.dueFrom, filters.dueTo) &&
        isDateInRange(task.createdAt, filters.createdFrom, filters.createdTo)
      );
    });

  if (filters.sortBy) {
    filtered.sort((left, right) => compareValues(left[filters.sortBy!], right[filters.sortBy!], filters.order));
  }

  return paginate(filtered, filters.page, filters.limit);
};

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({baseUrl: getApiBaseUrl()}),
  tagTypes: ['TTask'],
  endpoints: (builder) => ({
    getTasks: builder.query<TTaskListRow[], TTaskListFilters | void>({
      async queryFn(filters, _api, _extraOptions, fetchWithBQ) {
        const tasksResult = await fetchWithBQ('/tasks');

        if (tasksResult.error) {
          return {error: tasksResult.error};
        }

        const dealsResult = await fetchWithBQ('/deals');

        if (dealsResult.error) {
          return {error: dealsResult.error};
        }

        const usersResult = await fetchWithBQ('/users');

        if (usersResult.error) {
          return {error: usersResult.error};
        }

        return {
          data: getTaskRows(
            tasksResult.data as TTask[],
            dealsResult.data as TDeal[],
            usersResult.data as TUser[],
            filters || {},
          ),
        };
      },
      providesTags: (result) =>
        result
          ? [...result.map(({id}) => ({type: 'TTask' as const, id})), {type: 'TTask', id: 'LIST'}]
          : [{type: 'TTask', id: 'LIST'}],
    }),
    getTaskById: builder.query<TTask, string>({
      query: (taskId) => `/tasks/${taskId}`,
      providesTags: (_result, _error, taskId) => [{type: 'TTask', id: taskId}],
    }),
    createTask: builder.mutation<TTask, TCreateTaskPayload & {createdBy: string}>({
      query: (task) => ({
        url: '/tasks',
        method: 'POST',
        body: {
          id: crypto.randomUUID(),
          ...task,
          status: 'new',
          createdAt: new Date().toISOString(),
        },
      }),
      invalidatesTags: [{type: 'TTask', id: 'LIST'}],
    }),
    updateTask: builder.mutation<TTask, TUpdateTaskByIdPayload>({
      query: ({id, data}) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, {id}) => [
        {type: 'TTask', id},
        {type: 'TTask', id: 'LIST'},
      ],
    }),
    completeTask: builder.mutation<TTask, string>({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: 'PATCH',
        body: {status: 'completed'},
      }),
      invalidatesTags: (_result, _error, taskId) => [
        {type: 'TTask', id: taskId},
        {type: 'TTask', id: 'LIST'},
      ],
    }),
    deleteTask: builder.mutation<void, string>({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, taskId) => [
        {type: 'TTask', id: taskId},
        {type: 'TTask', id: 'LIST'},
      ],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useCompleteTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
