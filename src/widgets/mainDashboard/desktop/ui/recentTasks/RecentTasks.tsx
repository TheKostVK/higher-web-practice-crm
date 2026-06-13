import {Button, Skeleton} from 'antd';

import {useGetRecentTasksQuery} from '@/entities/dashboard';
import {useOpenModalRoute} from '@/shared/lib/modalRoute';
import {BlockTitle} from '@/widgets/mainDashboard/desktop/ui/blockTitle';
import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';

import Styles from './recentTasks.module.css';
import {renderCard} from '@/widgets/mainDashboard/desktop/ui/renderCard';

/**
 * Карточная сетка последних 10 задач текущего пользователя.
 */
export const RecentTasks = () => {
    const {data: tasks = [], isLoading, isError} = useGetRecentTasksQuery();
    const openModal = useOpenModalRoute();

    return (
        <div className={Styles.section}>
            <div className={Styles.content}>
                <BlockTitle title="Последние 10 задач" />
                {isLoading ? (
                    <Skeleton active />
                ) : isError ? (
                    <ApiErrorMessage message="Не удалось загрузить последние задачи." />
                ) : (
                    <ul className={Styles.grid}>{tasks.map(renderCard)}</ul>
                )}
            </div>

            <Button type="primary" onClick={() => openModal('tasks')}>
                Новая задача
            </Button>
        </div>
    );
};
