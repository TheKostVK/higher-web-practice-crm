import {Tabs} from 'antd';

import Styles from '../reportsContent.module.css';

import {ReportSection} from "@/widgets/reportsContent/ui/reportSection";
import {SalesReport} from "@/widgets/reportsContent/mobile/ui/salesReport";
import {DealsStageReport} from "@/widgets/reportsContent/mobile/ui/dealsStageReport";
import {NewClientsReport} from "@/widgets/reportsContent/mobile/ui/newClientsReport";
import {ClientActivityReport} from "@/widgets/reportsContent/mobile/ui/clientActivityReport";
import {OverdueTasksReport} from "@/widgets/reportsContent/mobile/ui/overdueTasksReport";
import {MainSection} from "@/shared/ui/mainSection";

const REPORT_TABS = [
    {
        key: 'sales',
        label: 'По продажам',
        children: (
            <>
                <ReportSection title="Общий, продажи">
                    <SalesReport />
                </ReportSection>
                <ReportSection title="Этапы сделок">
                    <DealsStageReport />
                </ReportSection>
            </>
        ),
    },
    {
        key: 'clients',
        label: 'По клиентам',
        children: (
            <>
                <ReportSection title="Новые клиенты">
                    <NewClientsReport />
                </ReportSection>
                <ReportSection title="Активность клиентов">
                    <ClientActivityReport />
                </ReportSection>
            </>
        ),
    },
    {
        key: 'tasks',
        label: 'По задачам',
        children: (
            <ReportSection title="Просроченные задачи">
                <OverdueTasksReport />
            </ReportSection>
        ),
    },
];

/**
 * Виджет отчётов с вкладками: продажи, клиенты, задачи для телефона.
 */
export const MobileReportContent = () => {
    return (
        <MainSection>
            <Tabs
                items={REPORT_TABS}
                defaultActiveKey="sales"
                destroyOnHidden
                className={Styles.reportsContent__tabs}
            />
        </MainSection>
    );
};
