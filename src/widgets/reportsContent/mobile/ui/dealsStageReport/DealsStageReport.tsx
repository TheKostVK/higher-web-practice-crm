import {useGetDealsStageReportQuery} from "@/entities/reports";
import {useReportFilters} from "@/widgets/reportsContent/hook";
import {ReportToolbar} from "@/widgets/reportsContent/ui/reportToolbar";
import {CompactDealsStageCards} from "@/widgets/reportsContent/mobile/ui/compactDealsStageCards";
import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';

export const DealsStageReport = () => {
    const {period, applied, handleFiltersChange, handlePeriodChange} = useReportFilters();
    const {data = [], isLoading, isError} = useGetDealsStageReportQuery(applied);

    return (
        <>
            <ReportToolbar
                period={period}
                onPeriodChange={handlePeriodChange}
                onFiltersChange={handleFiltersChange}
                reportName="deals-stage"
                filters={applied}
            />
            {isError ? (
                <ApiErrorMessage message="Не удалось загрузить отчёт по этапам сделок." />
            ) : (
                <CompactDealsStageCards items={data} emptyText="Нет этапов" isLoading={isLoading}/>
            )}
        </>
    );
};
