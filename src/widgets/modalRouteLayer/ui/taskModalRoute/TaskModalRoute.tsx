import type {Location} from 'react-router-dom';
import {useLocation, useNavigate, useParams} from 'react-router-dom';

import {useGetTaskByIdQuery} from '@/entities/task';
import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';
import {TaskModal} from '@/widgets/tasksList';

type TTaskModalRouteState = {
  backgroundLocation?: Location;
};

/**
 * Открывает модальное окно задачи по маршруту `/tasks/:id` или `/tasks/new`.
 */
export const TaskModalRoute = () => {
  const {id} = useParams<{id: string}>();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as TTaskModalRouteState | null;

  const {data: task, isError} = useGetTaskByIdQuery(id ?? '', {skip: !id});

  const handleClose = () => {
    if (state?.backgroundLocation) {
      navigate(state.backgroundLocation, {replace: true});
      return;
    }

    navigate('/tasks', {replace: true});
  };

  if (isError) {
    return <ApiErrorMessage message="Не удалось загрузить данные задачи." />;
  }

  return <TaskModal open={!id || Boolean(task)} task={task} onClose={handleClose} />;
};
