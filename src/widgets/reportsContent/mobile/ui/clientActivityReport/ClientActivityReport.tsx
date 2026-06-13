import {useGetClientActivityReportQuery} from "@/entities/reports";
import {getClientActivityCards} from "@/widgets/reportsContent/lib";
import {useReportFilters} from "@/widgets/reportsContent/hook";
import {ReportToolbar} from "@/widgets/reportsContent/ui/reportToolbar";
import {MobileReportBody} from "@/widgets/reportsContent/mobile/ui/mobileReportBody";

export const ClientActivityReport = () => {
    const {period, applied, handlePeriodChange} = useReportFilters();
    const {data = [], isLoading, isError} = useGetClientActivityReportQuery(applied);

    return (
        <>
            <ReportToolbar
                period={period}
                onPeriodChange={handlePeriodChange}
                reportName="client-activity"
                filters={applied}
            />
            <MobileReportBody
                items={getClientActivityCards(data)}
                emptyText="Нет активности клиентов"
                isLoading={isLoading}
                isError={isError}
                errorMessage="Не удалось загрузить отчёт по активности клиентов."
            />
        </>
    );
};
