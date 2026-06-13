import {useGetNewClientsReportQuery} from "@/entities/reports";
import {getNewClientCards} from "@/widgets/reportsContent/lib";
import {ReportToolbar} from "@/widgets/reportsContent/ui/reportToolbar";
import {useReportFilters} from "@/widgets/reportsContent/hook";
import {MobileReportBody} from "@/widgets/reportsContent/mobile/ui/mobileReportBody";

export const NewClientsReport = () => {
    const {period, applied, handlePeriodChange} = useReportFilters();
    const {data = [], isLoading, isError} = useGetNewClientsReportQuery(applied);

    return (
        <>
            <ReportToolbar
                period={period}
                onPeriodChange={handlePeriodChange}
                reportName="new-clients"
                filters={applied}
            />
            <MobileReportBody
                items={getNewClientCards(data)}
                emptyText="Нет новых клиентов"
                isLoading={isLoading}
                isError={isError}
                errorMessage="Не удалось загрузить отчёт по новым клиентам."
            />
        </>
    );
};
