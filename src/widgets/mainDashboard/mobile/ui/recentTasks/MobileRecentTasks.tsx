import {useGetRecentTasksQuery} from '@/entities/dashboard';
import type {TTaskStatus} from '@/entities/task';
import {formatDate} from '@/shared/lib/formatters';
import {useOpenModalRoute} from '@/shared/lib/modalRoute';
import {StatusCard, StatusText, type TStatusCardVariant} from '@/shared/ui/statusCard';

import Styles from './mobileRecentTasks.module.css';
import {MobileTab} from "@/widgets/mainDashboard/mobile/ui/mobileTab";

const TASK_STATUS_LABELS: Record<TTaskStatus, string> = {
    new: 'Новая',
    in_progress: 'В работе',
    completed: 'Завершена',
};

const TASK_CARD_VARIANT: Record<TTaskStatus, TStatusCardVariant> = {
    new: 'info',
    in_progress: 'default',
    completed: 'success',
};

const TASK_STATUS_TONE: Record<TTaskStatus, TStatusCardVariant> = {
    new: 'default',
    in_progress: 'info',
    completed: 'success',
};

/**
 * Карточный список последних 10 задач для мобильной версии.
 */
export const MobileRecentTasks = () => {
    const {data: tasks = [], isLoading, isError} = useGetRecentTasksQuery();
    const openModal = useOpenModalRoute();

    return (
        <MobileTab
            isLoading={isLoading}
            isError={isError}
            errorMessage="Не удалось загрузить последние задачи."
            tabTitle={'Последние 10 задач'}
            buttonText={'Новая задача'}
            buttonOnClick={() => openModal('tasks')}
        >
            <ul className={Styles.list}>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <StatusCard className={Styles.card} variant={TASK_CARD_VARIANT[task.status]}>
                            <div className={Styles.card__content}>
                                <span className={Styles.card__name}>{task.title}</span>
                                {task.dealTitle && (
                                    <span className={Styles.card__deal}>
                                        <span className={Styles.card__dealLabel}>сделка</span>
                                        {task.dealTitle}
                                    </span>
                                )}
                            </div>
                            <div className={Styles.card__meta}>
                                <span
                                    className={Styles.card__due}>до {formatDate(task.dueDate, 'longWithoutYear')}</span>
                                <StatusText className={Styles.card__status} tone={TASK_STATUS_TONE[task.status]}>
                                    {TASK_STATUS_LABELS[task.status]}
                                </StatusText>
                            </div>
                        </StatusCard>
                    </li>
                ))}
            </ul>
        </MobileTab>
    );
};
