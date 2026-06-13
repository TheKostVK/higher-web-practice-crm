import {Tabs} from 'antd';

import Styles from './desktop.module.css';

import {OverdueTasksReport} from '@/widgets/reportsContent/desktop/ui/overdueTasksReport';
import {ReportSection} from '@/widgets/reportsContent/ui/reportSection';
import {ClientActivityReport} from '@/widgets/reportsContent/desktop/ui/clientActivityReport';
import {NewClientsReport} from '@/widgets/reportsContent/desktop/ui/newClientsReport';
import {SalesReport} from '@/widgets/reportsContent/desktop/ui/salesReport';
import {DealsStageReport} from '@/widgets/reportsContent/desktop/ui/dealsStageReport';

const REPORT_TABS = [
    {
        key: 'sales',
        label: 'Отчёты по продажам',
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
        label: 'Отчёты по клиентам',
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
        label: 'Отчёты по задачам',
        children: (
            <ReportSection title="Просроченные задачи">
                <OverdueTasksReport />
            </ReportSection>
        ),
    },
];

/**
 * Виджет отчётов с вкладками: продажи, клиенты, задачи для компьютера.
 */
export const DesktopReportContent = () => {
    return (
        <div className={`${Styles.reportsContent}`}>
            <Tabs
                items={REPORT_TABS}
                defaultActiveKey="sales"
                destroyOnHidden
                className={Styles.reportsContent__tabs}
            />
        </div>
    );
};
