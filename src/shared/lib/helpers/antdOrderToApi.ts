export type TSortOrder = 'asc' | 'desc' | undefined;

export const antdOrderToApi = (order: string | null | undefined): TSortOrder => {
    if (order === 'ascend') {
        return 'asc';
    }

    if (order === 'descend') {
        return 'desc';
    }

    return undefined;
};