import {useState} from 'react';

import {TASK_STATUS_LABELS, useGetTasksQuery} from '@/entities/task';
import type {TTaskListRow, TTaskStatus} from '@/entities/task';
import {formatDate} from '@/shared/lib/formatters';
import {getCardA11yProps} from '@/shared/lib/helpers';
import {useOpenModalRoute} from '@/shared/lib/modalRoute';
import {MobileListShell} from '@/shared/ui/mobileListShell';
import {StatusTag} from '@/shared/ui/statusTag';

import Styles from './mobile.module.css';
import {TASK_STATUS_COLORS} from '@/widgets/tasksList/model';

/**
 * Мобильный список задач в виде карточек.
 */
export const MobileTasksList = () => {
    const [search, setSearch] = useState('');
    const openTaskModal = useOpenModalRoute();

    const {
        data: tasks = [],
        isFetching,
        isError,
    } = useGetTasksQuery({
        search: search || undefined,
    });

    const handleCardClick = (task: TTaskListRow) => {
        openTaskModal('tasks', task.id);
    };

    return (
        <MobileListShell
            search={search}
            onSearchChange={setSearch}
            searchAriaLabel="Искать задачу"
            isFetching={isFetching}
            isError={isError}
            errorMessage="Не удалось загрузить список задач."
            addButtonText="Новая задача"
            onAddClick={() => openTaskModal('tasks')}
        >
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className={Styles.mobileTasks__card}
                    {...getCardA11yProps(() => handleCardClick(task))}
                >
                    <p className={Styles['mobileTasks__cardTitle']}>{task.title}</p>
                    {task.dealTitle && <p className={Styles['mobileTasks__cardDeal']}>{task.dealTitle}</p>}
                    <div className={Styles['mobileTasks__cardFooter']}>
                        <span className={Styles['mobileTasks__cardAssignee']}>{task.assigneeName}</span>
                        <StatusTag
                            color={TASK_STATUS_COLORS[task.status as TTaskStatus]}
                            label={TASK_STATUS_LABELS[task.status as TTaskStatus]}
                        />
                        <span className={Styles['mobileTasks__cardDue']}>{formatDate(task.dueDate)}</span>
                    </div>
                </div>
            ))}
        </MobileListShell>
    );
};
