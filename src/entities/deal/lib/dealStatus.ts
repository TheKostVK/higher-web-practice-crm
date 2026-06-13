import type {TDealStatus} from '../types';

export const DEAL_STATUS_LABELS: Record<TDealStatus, string> = {
    new: 'Новая',
    in_progress: 'В работе',
    completed: 'Завершена',
    cancelled: 'Отменена',
};

export const DEAL_STATUS_COLOR: Record<TDealStatus, string> = {
    new: 'var(--color-accent-blue-500)',
    in_progress: 'transparent',
    completed: 'var(--color-accent-green-500)',
    cancelled: 'var(--color-accent-red-500)',
};

export const getDealStatusColor = (status: TDealStatus): string => DEAL_STATUS_COLOR[status];
