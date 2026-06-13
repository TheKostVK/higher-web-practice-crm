import {useState} from 'react';
import {Button, Input} from 'antd';

import {TASK_STATUS_LABELS, useGetTasksQuery} from '@/entities/task';
import type {TTaskListRow, TTaskStatus} from '@/entities/task';
import {formatDate} from '@/shared/lib/formatters';
import {useOpenModalRoute} from '@/shared/lib/modalRoute';
import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';
import {StatusTag} from '@/shared/ui/statusTag';

import Styles from './mobile.module.css';
import {TASK_STATUS_COLORS} from "@/widgets/tasksList/model";
import {MainSection} from "@/shared/ui/mainSection";

/**
 * Мобильный список задач в виде карточек.
 */
export const MobileTasksList = () => {
    const [search, setSearch] = useState('');
    const openTaskModal = useOpenModalRoute();

    const {data: tasks = [], isFetching, isError} = useGetTasksQuery({
        search: search || undefined,
    });

    const handleCardClick = (task: TTaskListRow) => {
        openTaskModal('tasks', task.id);
    };

    const handleAddClick = () => {
        openTaskModal('tasks');
    };

    return (
        <MainSection>
            <Input
                className={Styles.mobileTasks__search}
                placeholder="Искать"
                allowClear
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Искать сделку"
                disabled={isFetching}
                prefix={<span className={Styles['mobileTasks__searchIcon']} aria-hidden="true"/>}
            />
            {isError && <ApiErrorMessage message="Не удалось загрузить список задач." />}
            <div className={Styles.mobileTasks__list}>
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className={Styles.mobileTasks__card}
                        role="button"
                        tabIndex={0}
                        onClick={() => handleCardClick(task)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCardClick(task)}
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
            </div>
            <Button className={Styles.mobileTasks__addButton} type="primary" onClick={handleAddClick}>
                Новая задача
            </Button>
        </MainSection>
    );
};
