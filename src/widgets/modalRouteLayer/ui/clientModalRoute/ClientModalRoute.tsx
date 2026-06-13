import type {Location} from 'react-router-dom';
import {useLocation, useNavigate, useParams} from 'react-router-dom';

import {useGetClientByIdQuery} from '@/entities/client';
import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';
import {ClientModal} from '@/widgets/clientsList';

type TClientModalRouteState = {
  backgroundLocation?: Location;
};

/**
 * Открывает модальное окно клиента по маршруту `/clients/:id` или `/clients/new`.
 */
export const ClientModalRoute = () => {
  const {id} = useParams<{id: string}>();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as TClientModalRouteState | null;

  const {data: client, isError} = useGetClientByIdQuery(id ?? '', {skip: !id});

  const handleClose = () => {
    if (state?.backgroundLocation) {
      navigate(state.backgroundLocation, {replace: true});
      return;
    }

    navigate('/clients', {replace: true});
  };

  if (isError) {
    return <ApiErrorMessage message="Не удалось загрузить данные клиента." />;
  }

  return <ClientModal open={!id || Boolean(client)} client={client} onClose={handleClose} />;
};
