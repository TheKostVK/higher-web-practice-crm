import {Navigate, Route, Routes, type Location} from 'react-router-dom';

import {DashboardPage} from '@/pages/dashboard';
import {ClientsPage} from '@/pages/clients';
import {DealsPage} from '@/pages/deals';
import {ReportsPage} from '@/pages/reports';
import {TasksPage} from '@/pages/tasks';
import {ProfilePage} from '@/pages/profile';

type TPageRoutesProps = {
    location: Location;
};

export const PageRoutes = ({location}: TPageRoutesProps) => (
    <Routes location={location}>
        <Route index element={<DashboardPage />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="clients/new" element={<ClientsPage />} />
        <Route path="clients/:id" element={<ClientsPage />} />
        <Route path="deals" element={<DealsPage />} />
        <Route path="deals/new" element={<DealsPage />} />
        <Route path="deals/:id" element={<DealsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="tasks/new" element={<TasksPage />} />
        <Route path="tasks/:id" element={<TasksPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
);
