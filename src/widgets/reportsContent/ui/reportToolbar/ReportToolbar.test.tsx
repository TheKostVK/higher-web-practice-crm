import {render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';

import {ReportToolbar} from './ReportToolbar';

vi.mock('@/entities/reports', async () => {
  const actual = await vi.importActual<typeof import('@/entities/reports')>('@/entities/reports');

  return {
    ...actual,
    useExportReportPdfMutation: () => [vi.fn(), {isLoading: false}],
    useExportReportXlsxMutation: () => [vi.fn(), {isLoading: false}],
  };
});

vi.mock('@/entities/user', () => ({
  useGetUsersQuery: () => ({
    data: [{id: 'user-1', name: 'Менеджер'}],
  }),
}));

describe('ReportToolbar', () => {
  it('показывает фильтры по периоду, датам, менеджеру и этапу сделки', () => {
    render(
      <ReportToolbar
        period="week"
        filters={{period: 'week'}}
        reportName="sales"
        onFiltersChange={vi.fn()}
        onPeriodChange={vi.fn()}
      />,
    );

    expect(screen.getByRole('combobox', {name: /период/i})).toBeInTheDocument();
    expect(screen.getByLabelText(/дата с/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/дата по/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox', {name: /менеджер/i})).toBeInTheDocument();
    expect(screen.getByRole('combobox', {name: /этап сделки/i})).toBeInTheDocument();
  });
});
