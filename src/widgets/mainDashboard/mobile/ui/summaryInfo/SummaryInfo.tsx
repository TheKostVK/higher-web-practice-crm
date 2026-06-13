import {METRIC_HEADER, useGetDashboardStatsQuery} from "@/entities/dashboard";

import Styles from './summaryInfo.module.css';
import {TableRow} from "./ui/tableRow";
import {TableHeader} from "@/widgets/summaryInfo/ui/tableHeader";
import {memo} from "react";


export const SummaryInfo = memo(() => {
    const {data: stats, isLoading} = useGetDashboardStatsQuery();

    const metricsHeader: string[] = ['', ...Object.values(METRIC_HEADER)];

    return (
        <table className={Styles.summaryInfo}>
            <thead className={Styles.table__head}>
                <TableHeader data={metricsHeader}/>
            </thead>
            <tbody className={Styles.table__body}>
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
            </tbody>
        </table>
    );
});
