import {useState} from 'react';
import type {TReportFilters, TReportPeriod} from '@/entities/reports';

export const useReportFilters = () => {
  const [period, setPeriod] = useState<TReportPeriod | ''>('');
  const [applied, setApplied] = useState<TReportFilters>({period: '', view: 'list'});

  const handleFiltersChange = (nextFilters: TReportFilters) => {
    setApplied(nextFilters);
    setPeriod(nextFilters.period || '');
  };

  const handlePeriodChange = (next: TReportPeriod | '') => {
    handleFiltersChange({...applied, period: next || undefined, view: 'list'});
  };

  return {period, applied, handleFiltersChange, handlePeriodChange};
};
