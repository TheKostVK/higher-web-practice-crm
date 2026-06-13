import {useState} from 'react';
import type {TReportFilters, TReportPeriod} from '@/entities/reports';

export const useReportFilters = () => {
  const [period, setPeriod] = useState<TReportPeriod | ''>('');
  const [applied, setApplied] = useState<TReportFilters>({period: '', view: 'list'});

  const handlePeriodChange = (next: TReportPeriod | '') => {
    setApplied({...applied, period: next || undefined, view: 'list'});
    setPeriod(next);
  };

  return {period, applied, handlePeriodChange};
};
