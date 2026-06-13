import {SummaryInfo} from '@/widgets/mainDashboard/desktop/ui/summaryInfo';
import {ActivityDeals} from '@/widgets/mainDashboard/desktop/ui/activityDeals';
import {TopClients} from '@/widgets/mainDashboard/desktop/ui/topClients';
import {RecentTasks} from '@/widgets/mainDashboard/desktop/ui/recentTasks';

import Style from './desktop.module.css';

export const DesktopDashboard = () => {
    return (
        <div className={Style.dashboardLayout}>
            <SummaryInfo />
            <TopClients />
            <ActivityDeals />
            <RecentTasks />
        </div>
    );
};
