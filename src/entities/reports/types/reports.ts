import type { TDealStatus } from '../../deal';
import type { TTaskStatus } from '../../task';

export type TReportPeriod = 'week' | 'month' | 'quarter';
export type TReportView = 'list';
export type TReportExportFormat = 'pdf' | 'xlsx';

export type TSalesReportRow = {
  dealId: string;
  title: string;
  clientName: string;
  amount: number;
  completedAt: string;
};

export type TDealsStageReportRow = {
  stage: TDealStatus;
  dealsCount: number;
  totalAmount: number;
};

export type TNewClientReportRow = {
  clientId: string;
  clientName: string;
  company: string;
  createdAt: string;
};

export type TClientActivityReportRow = {
  clientId: string;
  clientName: string;
  dealsCount: number;
  completedTasks: number;
};

export type TOverdueTaskReportRow = {
  taskId: string;
  title: string;
  assigneeName: string;
  dueDate: string;
  status: TTaskStatus;
};

export type TReportFilters = {
  period?: TReportPeriod;
  view?: TReportView;
  dateFrom?: string;
  dateTo?: string;

  managerId?: string;
  clientId?: string;

  dealStatus?: TDealStatus;
  taskStatus?: TTaskStatus;
};

export type TReportExportPayload = {
  reportName: string;
  format: TReportExportFormat;
  filters?: TReportFilters;
};

export type TReportExportResult = {
  reportName: string;
  format: TReportExportFormat;
  createdAt: string;
  url?: string;
};
