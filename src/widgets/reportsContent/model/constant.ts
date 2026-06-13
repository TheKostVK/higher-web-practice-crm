import {DEAL_STATUS_LABELS, type TDealStatus} from '@/entities/deal';
import {TASK_STATUS_LABELS, type TTaskStatus} from '@/entities/task';

export const PERIOD_OPTIONS = [
    {value: '', label: 'Любой период'},
    {value: 'week', label: 'За неделю'},
    {value: 'month', label: 'За месяц'},
    {value: 'quarter', label: 'За квартал'},
];

export const REPORT_VIEW_OPTIONS = [{value: 'list', label: 'Списком'}];

export const DEAL_STATUS_FILTER_OPTIONS: Array<{value: TDealStatus; label: string}> = Object.entries(
  DEAL_STATUS_LABELS,
).map(([value, label]) => ({
  value: value as TDealStatus,
  label,
}));

export const TASK_STATUS_FILTER_OPTIONS: Array<{value: TTaskStatus; label: string}> = Object.entries(
  TASK_STATUS_LABELS,
).map(([value, label]) => ({
  value: value as TTaskStatus,
  label,
}));

export const PAGE_SIZE = 15;

export const SALES_CARD_PLACEHOLDER_ID = (dealId: string) => dealId.replace(/^deal-/, '').padStart(4, '1');

export const SALES_STAGE_ORDER: TDealStatus[] = ['in_progress', 'new', 'cancelled'];
