import {PageTitle} from '@/shared/ui/pageTitle';
import {TasksList} from '@/widgets/tasksList';
import {MainSection} from '@/shared/ui/mainSection';

/**
 * Страница управления задачами.
 */
export const TasksPage = () => (
    <MainSection>
        <PageTitle title="Задачи" />
        <TasksList />
    </MainSection>
);
