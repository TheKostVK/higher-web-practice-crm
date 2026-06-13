import {useReportFilters} from "@/widgets/reportsContent/hook";
import {ReportToolbar} from "@/widgets/reportsContent/ui/reportToolbar/ReportToolbar.tsx";
import {getOverdueTaskCards} from "@/widgets/reportsContent/lib";
import {MobileReportBody} from "@/widgets/reportsContent/mobile/ui/mobileReportBody";
import {useGetOverdueTasksReportQuery} from "@/entities/reports";

export type TReportViewProps = {
    isMobile?: boolean;
};

export const OverdueTasksReport = () => {
    const {period, applied, handleFiltersChange, handlePeriodChange} = useReportFilters();
    const {data = [], isLoading, isError} = useGetOverdueTasksReportQuery(applied);

    return (
        <>
            <ReportToolbar
                period={period}
                onPeriodChange={handlePeriodChange}
                onFiltersChange={handleFiltersChange}
                reportName="overdue-tasks"
                filters={applied}
            />
            <MobileReportBody
                items={getOverdueTaskCards(data)}
                emptyText="Нет просроченных задач"
                isLoading={isLoading}
                isError={isError}
                errorMessage="Не удалось загрузить отчёт по просроченным задачам."
            />
        </>
    );
};
