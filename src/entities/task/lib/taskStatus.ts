import type {TTaskStatus} from '../types';

export const TASK_STATUS_LABELS: Record<TTaskStatus, string> = {
    new: 'Новая',
    in_progress: 'В работе',
    completed: 'Завершена',
};

export const TASK_STATUS_COLOR: Record<TTaskStatus, string> = {
    new: 'var(--color-neutral-gray-800)',
    in_progress: 'var(--color-accent-blue-500)',
    completed: 'var(--color-accent-green-500)',
};

export const getTaskStatusColor = (status: TTaskStatus): string => TASK_STATUS_COLOR[status];
