import type {Location} from 'react-router-dom';
import {useLocation, useNavigate, useParams} from 'react-router-dom';

import {useGetDealByIdQuery} from '@/entities/deal';
import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';
import {DealModal} from '@/widgets/dealsList';

type TDealModalRouteState = {
  backgroundLocation?: Location;
};

/**
 * Открывает модальное окно сделки по маршруту `/deals/:id` или `/deals/new`.
 */
export const DealModalRoute = () => {
    const {id} = useParams<{id: string}>();
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as TDealModalRouteState | null;

    const {data: deal, isError} = useGetDealByIdQuery(id ?? '', {skip: !id});

    const handleClose = () => {
        if (state?.backgroundLocation) {
            navigate(state.backgroundLocation, {replace: true});
            return;
        }

        navigate('/deals', {replace: true});
    };

    if (isError) {
        return <ApiErrorMessage message="Не удалось загрузить данные сделки." />;
    }

    return <DealModal open={!id || Boolean(deal)} deal={deal} onClose={handleClose} />;
};
