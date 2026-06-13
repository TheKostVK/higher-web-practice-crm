import {Tabs, type TabsProps} from 'antd';

import {MobileTopClients} from '@/widgets/mainDashboard/mobile/ui/topClients';
import {MobileRecentTasks} from '@/widgets/mainDashboard/mobile/ui/recentTasks';
import {MobileActivityDeals} from '@/widgets/mainDashboard/mobile/ui/activityDeals';

import Styles from './mobile.module.css';
import {MobileHome} from '@/widgets/mainDashboard/mobile/ui/mobileHome';

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Главная',
        children: <MobileHome />,
    },
    {
        key: '2',
        label: 'Клиенты',
        children: <MobileTopClients />,
    },
    {
        key: '3',
        label: 'Сделки',
        children: <MobileActivityDeals />,
    },
    {
        key: '4',
        label: 'Задачи',
        children: <MobileRecentTasks />,
    },
];

export const MobileDashboard = () => {
    return (
        <div className={Styles.dashboardLayout}>
            <Tabs destroyOnHidden defaultActiveKey="1" items={items} centered className={Styles.dashboardTabs} />
        </div>
    );
};
