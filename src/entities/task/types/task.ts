export type TTaskStatus = 'new' | 'in_progress' | 'completed';

export type TTask = {
    id: string;

    title: string;
    description?: string;

    dealId?: string;

    assigneeId: string; // userId

    status: TTaskStatus;

    dueDate?: string;

    createdAt: string;
    createdBy: string;
};

export type TTaskSortField = 'title' | 'dealId' | 'assigneeId' | 'status' | 'dueDate' | 'createdAt';

export type TTaskListFilters = {
    search?: string;
    status?: TTaskStatus;
    dealId?: string;
    assigneeId?: string;
    dueFrom?: string;
    dueTo?: string;
    createdFrom?: string;
    createdTo?: string;
    overdue?: boolean;
    managerId?: string;
    sortBy?: TTaskSortField;
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
};

export type TTaskListRow = TTask & {
    dealTitle?: string;
    assigneeName: string;
};

export type TCreateTaskPayload = {
    title: string;
    description?: string;
    dealId?: string;
    assigneeId: string;
    dueDate?: string;
};

export type TUpdateTaskPayload = {
    title?: string;
    description?: string;
    dealId?: string;
    status?: TTaskStatus;
    dueDate?: string;
    assigneeId?: string;
};

export type TUpdateTaskByIdPayload = {
    id: string;
    data: TUpdateTaskPayload;
};
