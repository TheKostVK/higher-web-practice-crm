import {useGetSalesReportQuery} from "@/entities/reports";
import {useReportFilters} from "@/widgets/reportsContent/hook";
import {ReportToolbar} from "@/widgets/reportsContent/ui/reportToolbar";
import {CompactSalesCards} from "@/widgets/reportsContent/mobile/ui/compactSalesCards";
import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';

export const SalesReport = () => {
    const {period, applied, handleFiltersChange, handlePeriodChange} = useReportFilters();
    const {data = [], isLoading, isError} = useGetSalesReportQuery(applied);

    return (
        <>
            <ReportToolbar period={period} onPeriodChange={handlePeriodChange} onFiltersChange={handleFiltersChange} reportName="sales" filters={applied}/>
            {isError ? (
                <ApiErrorMessage message="Не удалось загрузить отчёт по продажам." />
            ) : (
                <CompactSalesCards items={data} emptyText="Нет продаж" isLoading={isLoading}/>
            )}
        </>
    );
};
