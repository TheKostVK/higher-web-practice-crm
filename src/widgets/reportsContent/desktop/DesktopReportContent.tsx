import {SummaryInfo} from '@/widgets/mainDashboard/desktop/ui/summaryInfo';
import {ActivityDeals} from '@/widgets/mainDashboard/desktop/activityDeals';
import {TopClients} from '@/widgets/mainDashboard/desktop/topClients';
import {RecentTasks} from '@/widgets/mainDashboard/desktop/recentTasks';

import Style from './desktop.module.css';

export const DesktopDashboard = () => {
    return (
        <div className={Style.dashboardLayout}>
            <SummaryInfo/>
            <TopClients/>
            <ActivityDeals/>
            <RecentTasks/>
        </div>
    );
};
