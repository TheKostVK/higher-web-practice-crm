export type TClient = {
    id: string;
    name: string;
    phone: string;
    email: string;
    company: string;
    website?: string;
    comment?: string;

    createdAt: string;
    deleted?: boolean;

    createdBy: string; // userId
};

export type TListOrder = 'asc' | 'desc';

export type TBaseListFilters = {
    search?: string;
    sortBy?: string;
    order?: TListOrder;
    page?: number;
    limit?: number;
    createdFrom?: string;
    createdTo?: string;
    managerId?: string;
};

export type TClientSortField = 'name' | 'phone' | 'email' | 'company' | 'website' | 'comment' | 'createdAt';

export type TClientListFilters = Omit<TBaseListFilters, 'sortBy'> & {
    deleted?: boolean;
    createdBy?: string;
    sortBy?: TClientSortField;
};

export type TClientListRow = TClient;

export type TTopClientRow = TClient & {
    dealsCount: number;
};

export type TCreateClientPayload = {
    name: string;
    phone: string;
    email: string;
    company: string;
    website?: string;
    comment?: string;
};

export type TUpdateClientPayload = Partial<TCreateClientPayload>;

export type TUpdateClientByIdPayload = {
    id: string;
    data: TUpdateClientPayload;
};
