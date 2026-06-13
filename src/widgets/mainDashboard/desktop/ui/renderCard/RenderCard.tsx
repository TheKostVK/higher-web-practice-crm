import type {TDashboardRecentTask} from "@/entities/dashboard";
import {formatDate} from "@/shared/lib/formatters";
import {TASK_STATUS_LABELS, type TTaskStatus} from "@/entities/task";

import Styles from './recentCard.module.css';

const TASK_CARD_CLASS: Record<TTaskStatus, string> = {
    new: Styles['card--new'],
    in_progress: Styles['card--inProgress'],
    completed: Styles['card--completed'],
};

export const renderCard = (task: TDashboardRecentTask) => (
    <li key={task.id} className={`${Styles.card} ${TASK_CARD_CLASS[task.status]}`}>
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
            <span className={`${Styles.card__status} ${Styles[`card__status--${task.status}`] || ''}`}>
                {TASK_STATUS_LABELS[task.status]}
            </span>
        </div>
    </li>
);
