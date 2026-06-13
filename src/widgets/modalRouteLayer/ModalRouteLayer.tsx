import type {Location} from 'react-router-dom';
import {Route, Routes, useLocation} from 'react-router-dom';

import {ClientModalRoute} from './ui/clientModalRoute';
import {DealModalRoute} from './ui/dealModalRoute';
import {TaskModalRoute} from './ui/taskModalRoute';

type TModalRouteLayerState = {
  backgroundLocation?: Location;
};

/**
 * Второй набор маршрутов (`/clients/:id`, `/clients/new` и т.п.), который отрисовывает
 * модальное окно поверх фоновой страницы (`backgroundLocation` из state).
 * Если перехода с сохранением фона не было — модалка не отображается.
 */
export const ModalRouteLayer = () => {
    const location = useLocation();
    const state = location.state as TModalRouteLayerState | null;

    if (!state?.backgroundLocation) {
        return null;
    }

    return (
        <Routes>
            <Route path="/clients/new" element={<ClientModalRoute />} />
            <Route path="/clients/:id" element={<ClientModalRoute />} />
            <Route path="/deals/new" element={<DealModalRoute />} />
            <Route path="/deals/:id" element={<DealModalRoute />} />
            <Route path="/tasks/new" element={<TaskModalRoute />} />
            <Route path="/tasks/:id" element={<TaskModalRoute />} />
        </Routes>
    );
};
