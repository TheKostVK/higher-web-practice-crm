import {useGetDashboardStatsQuery} from "@/entities/dashboard";

import Styles from './summaryInfo.module.css';
import {TableRow} from "./ui/tableRow";


export const SummaryInfo = () => {
    const {data: stats, isLoading} = useGetDashboardStatsQuery();

    return (
        <div className={Styles.summaryInfo}>
            <TableRow
                title={'Клиенты'}
                data={stats?.clients}
                isLoading={isLoading}
            />
            <TableRow
                title={'Активные сделки'}
                data={stats?.activeDeals}
                isLoading={isLoading}
            />
            <TableRow
                title={'Завершённые сделки'}
                data={stats?.completedDeals}
                isLoading={isLoading}
            />
        </div>
    );
};
