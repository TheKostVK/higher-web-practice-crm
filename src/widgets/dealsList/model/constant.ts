import type {TTaskStatus} from "@/entities/task";

export const TASK_STATUS_COLORS: Record<TTaskStatus, string> = {
    new: 'default',
    in_progress: 'processing',
    completed: 'success',
};

export const STATUS_FILTER_OPTIONS = [
    {value: '', label: 'Все статусы'},
    {value: 'new', label: 'Новая'},
    {value: 'in_progress', label: 'В работе'},
    {value: 'completed', label: 'Завершена'},
];