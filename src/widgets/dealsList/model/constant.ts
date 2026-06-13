import type {TDealStatus} from "@/entities/deal";

export const DEAL_STATUS_COLORS: Record<TDealStatus, string> = {
    new: 'default',
    in_progress: 'processing',
    completed: 'success',
    cancelled: 'error',
};

export const STATUS_FILTER_OPTIONS = [
    {value: '', label: 'Все статусы'},
    {value: 'new', label: 'Новая'},
    {value: 'in_progress', label: 'В работе'},
    {value: 'completed', label: 'Завершена'},
    {value: 'cancelled', label: 'Отменена'},
];