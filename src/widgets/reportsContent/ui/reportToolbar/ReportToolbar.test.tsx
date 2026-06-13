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

describe('ReportToolbar', () => {
    it('показывает только фильтры по периоду и виду отчёта', () => {
        render(<ReportToolbar period="week" filters={{period: 'week'}} reportName="sales" onPeriodChange={vi.fn()} />);

        expect(screen.getByRole('combobox', {name: /период/i})).toBeInTheDocument();
        expect(screen.getByRole('combobox', {name: /вид отчёта/i})).toBeInTheDocument();
        expect(screen.queryByLabelText(/дата с/i)).not.toBeInTheDocument();
        expect(screen.queryByLabelText(/дата по/i)).not.toBeInTheDocument();
        expect(screen.queryByRole('combobox', {name: /менеджер/i})).not.toBeInTheDocument();
        expect(screen.queryByRole('combobox', {name: /этап сделки/i})).not.toBeInTheDocument();
        expect(screen.queryByRole('combobox', {name: /статус задачи/i})).not.toBeInTheDocument();
    });
});
