import HomeSVG from './assetes/Name=Home.svg?react';
import ClientsSVG from './assetes/Name=Team.svg?react';
import DealsSVG from './assetes/Name=Briefcase.svg?react';
import ReportsSVG from './assetes/Name=Task.svg?react';
import TasksSVG from './assetes/Name=Project.svg?react';
import type {TAppSidebarItem} from '@/widgets/appSidebar/types/types';

export const appSidebarContentItems: TAppSidebarItem[] = [
    {
        title: 'Главная',
        pathname: '/',
        icon: <HomeSVG />,
    },
    {
        title: 'Клиенты',
        pathname: '/clients',
        icon: <ClientsSVG />,
    },
    {
        title: 'Сделки',
        pathname: '/deals',
        icon: <DealsSVG />,
    },
    {
        title: 'Отчёты',
        pathname: '/reports',
        icon: <ReportsSVG />,
    },
    {
        title: 'Задачи',
        pathname: '/tasks',
        icon: <TasksSVG />,
    },
];
