import type {TDashboardRecentTask} from "@/entities/dashboard";
import {formatDate} from "@/shared/lib/formatters";
import {TASK_STATUS_LABELS} from "@/entities/task";
import type {TTaskStatus} from "@/entities/task";
import {StatusCard, StatusText, type TStatusCardVariant} from "@/shared/ui/statusCard";

import Styles from './recentCard.module.css';

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
 * Отображает карточку задачи для дашборда.
 * @param task Задача дашборда.
 * @returns Элемент списка с карточкой задачи.
 */
export const renderCard = (task: TDashboardRecentTask) => (
    <li key={task.id}>
        <StatusCard className={Styles.card} variant={TASK_CARD_VARIANT[task.status]}>
            <div className={Styles.card__top}>
                <span className={Styles.card__title}>{task.title}</span>
                {task.dealTitle && (
                    <>
                        <span className={Styles.card__dealLabel}>сделка</span>
                        <span className={Styles.card__dealTitle}>{task.dealTitle}</span>
                    </>
                )}
            </div>
            <div className={Styles.card__bottom}>
                <span className={Styles.card__due}>до {formatDate(task.dueDate, 'longWithoutYear')}</span>
                <StatusText className={Styles.card__status} tone={TASK_STATUS_TONE[task.status]}>
                    {TASK_STATUS_LABELS[task.status]}
                </StatusText>
            </div>
        </StatusCard>
    </li>
);
