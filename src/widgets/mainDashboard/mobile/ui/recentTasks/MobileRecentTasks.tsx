import {useGetRecentTasksQuery} from '@/entities/dashboard';
import type {TTaskStatus} from '@/entities/task';
import {formatDate} from '@/shared/lib/formatters';
import {useOpenModalRoute} from '@/shared/lib/modalRoute';

import Styles from './mobileRecentTasks.module.css';
import {MobileTab} from "@/widgets/mainDashboard/mobile/ui/mobileTab";
import {Card} from "@/shared/ui/card";

const TASK_STATUS_LABELS: Record<TTaskStatus, string> = {
    new: 'Новая',
    in_progress: 'В работе',
    completed: 'Завершена',
};

const TASK_STATUS_CLASS_NAMES: Record<TTaskStatus, string> = {
    new: Styles.card_new,
    in_progress: Styles.card_inProgress,
    completed: Styles.card_completed,
};

const TASK_STATUS_TEXT_CLASS_NAMES: Record<TTaskStatus, string> = {
    new: Styles.card__status_new,
    in_progress: Styles.card__status_inProgress,
    completed: Styles.card__status_completed,
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
                        <Card className={`${Styles.card} ${TASK_STATUS_CLASS_NAMES[task.status]}`}>
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
                                <span className={`${Styles.card__status} ${TASK_STATUS_TEXT_CLASS_NAMES[task.status]}`}>
                                        {TASK_STATUS_LABELS[task.status]}
                                      </span>
                            </div>
                        </Card>
                    </li>
                ))}
            </ul>
        </MobileTab>
    );
};
