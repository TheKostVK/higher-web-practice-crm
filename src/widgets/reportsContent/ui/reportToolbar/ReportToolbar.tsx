import {
  type TReportFilters,
  type TReportPeriod,
  useExportReportPdfMutation,
  useExportReportXlsxMutation,
} from '@/entities/reports';
import {useGetUsersQuery} from '@/entities/user';
import {Button} from '@/shared/ui/button';
import Styles from '@/widgets/reportsContent/reportsContent.module.css';
import {DatePicker, Select} from 'antd';
import dayjs from 'dayjs';
import {
  DEAL_STATUS_FILTER_OPTIONS,
  PERIOD_OPTIONS,
  REPORT_VIEW_OPTIONS,
  TASK_STATUS_FILTER_OPTIONS,
} from '@/widgets/reportsContent/model';
import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';

type TReportToolbarProps = {
  period: TReportPeriod | '';
  onPeriodChange: (period: TReportPeriod | '') => void;
  onFiltersChange: (filters: TReportFilters) => void;
  reportName: string;
  filters: TReportFilters;
};

/**
 * Отображает общий блок фильтров и экспорта для секций отчётов.
 * @param period Выбранный период.
 * @param onPeriodChange Обработчик смены периода.
 * @param onFiltersChange Обработчик смены фильтров отчёта.
 * @param reportName Имя отчёта для экспорта.
 * @param filters Применённые фильтры отчёта.
 */
export const ReportToolbar = ({
  period,
  onPeriodChange,
  onFiltersChange,
  reportName,
  filters,
}: TReportToolbarProps) => {
  const [exportPdf, {isLoading: isPdfLoading}] = useExportReportPdfMutation();
  const [exportXlsx, {isLoading: isXlsxLoading}] = useExportReportXlsxMutation();
  const {data: users = [], isError: isUsersError} = useGetUsersQuery();

  const managerOptions = users.map((user) => ({
    value: user.id,
    label: user.name,
  }));
  const updateFilters = (nextFilters: TReportFilters) => {
    onFiltersChange({...nextFilters, view: 'list'});
  };

  return (
    <>
      {isUsersError && <ApiErrorMessage message="Не удалось загрузить список менеджеров." />}
      <div className={Styles.reportsContent__toolbar}>
        <Select
          aria-label="Период"
          className={`${Styles.reportsContent__filter} ${Styles.reportsContent__filterPeriod}`}
          options={PERIOD_OPTIONS}
          value={period}
          onChange={(v) => onPeriodChange(v as TReportPeriod | '')}
          placeholder="Период"
        />
        <DatePicker
          aria-label="Дата с"
          className={`${Styles.reportsContent__filter} ${Styles.reportsContent__filterDate}`}
          value={filters.dateFrom ? dayjs(filters.dateFrom) : null}
          placeholder="Дата с"
          onChange={(date) =>
            updateFilters({
              ...filters,
              period: undefined,
              dateFrom: date ? date.startOf('day').toISOString() : undefined,
            })
          }
        />
        <DatePicker
          aria-label="Дата по"
          className={`${Styles.reportsContent__filter} ${Styles.reportsContent__filterDate}`}
          value={filters.dateTo ? dayjs(filters.dateTo) : null}
          placeholder="Дата по"
          onChange={(date) =>
            updateFilters({
              ...filters,
              period: undefined,
              dateTo: date ? date.endOf('day').toISOString() : undefined,
            })
          }
        />
        <Select
          allowClear
          aria-label="Менеджер"
          className={`${Styles.reportsContent__filter} ${Styles.reportsContent__filterManager}`}
          options={managerOptions}
          value={filters.managerId}
          onChange={(managerId) => updateFilters({...filters, managerId})}
          placeholder="Менеджер"
        />
        <Select
          allowClear
          aria-label="Этап сделки"
          className={`${Styles.reportsContent__filter} ${Styles.reportsContent__filterStatus}`}
          options={DEAL_STATUS_FILTER_OPTIONS}
          value={filters.dealStatus}
          onChange={(dealStatus) => updateFilters({...filters, dealStatus})}
          placeholder="Этап сделки"
        />
        <Select
          allowClear
          aria-label="Статус задачи"
          className={`${Styles.reportsContent__filter} ${Styles.reportsContent__filterStatus}`}
          options={TASK_STATUS_FILTER_OPTIONS}
          value={filters.taskStatus}
          onChange={(taskStatus) => updateFilters({...filters, taskStatus})}
          placeholder="Статус задачи"
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
    </>
  );
};
