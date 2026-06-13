import {
    type TReportFilters,
    type TReportPeriod,
    useExportReportPdfMutation,
    useExportReportXlsxMutation,
} from '@/entities/reports';
import {Button} from '@/shared/ui/button';
import Styles from '@/widgets/reportsContent/reportsContent.module.css';
import {Select} from 'antd';
import {PERIOD_OPTIONS, REPORT_VIEW_OPTIONS} from '@/widgets/reportsContent/model';

type TReportToolbarProps = {
    period: TReportPeriod | '';
    onPeriodChange: (period: TReportPeriod | '') => void;
    reportName: string;
    filters: TReportFilters;
};

/**
 * Отображает общий блок фильтров и экспорта для секций отчётов.
 * @param period Выбранный период.
 * @param onPeriodChange Обработчик смены периода.
 * @param reportName Имя отчёта для экспорта.
 * @param filters Применённые фильтры отчёта.
 */
export const ReportToolbar = ({period, onPeriodChange, reportName, filters}: TReportToolbarProps) => {
    const [exportPdf, {isLoading: isPdfLoading}] = useExportReportPdfMutation();
    const [exportXlsx, {isLoading: isXlsxLoading}] = useExportReportXlsxMutation();

    return (
        <div className={Styles.reportsContent__toolbar}>
            <Select
                aria-label="Период"
                className={`${Styles.reportsContent__filter} ${Styles.reportsContent__filterPeriod}`}
                options={PERIOD_OPTIONS}
                value={period}
                onChange={(v) => onPeriodChange(v as TReportPeriod | '')}
                placeholder="Период"
            />
            <Select
                aria-label="Вид отчёта"
                className={`${Styles.reportsContent__filter} ${Styles.reportsContent__filterView}`}
                options={REPORT_VIEW_OPTIONS}
                value="list"
            />
            <div className={Styles.reportsContent__toolbarExport}>
                <Button
                    view="outline"
                    className={Styles.reportsContent__toolbarButton}
                    loading={isPdfLoading}
                    onClick={() => void exportPdf({reportName, filters})}
                >
                    Экспорт в PDF
                </Button>
                <Button
                    view="outline"
                    className={Styles.reportsContent__toolbarButton}
                    loading={isXlsxLoading}
                    onClick={() => void exportXlsx({reportName, filters})}
                >
                    Экспорт в XLSX
                </Button>
            </div>
        </div>
    );
};
