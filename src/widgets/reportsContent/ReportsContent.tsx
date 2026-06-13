import {useIsMobile} from '@/shared/lib/hooks';

import {lazy, Suspense} from 'react';
import {Preloader} from '@/shared/ui/preloader';

const MobileReportContent = lazy(() =>
    import('@/widgets/reportsContent/mobile').then((module) => ({default: module.MobileReportContent})),
);
const DesktopReportContent = lazy(() =>
    import('@/widgets/reportsContent/desktop').then((module) => ({default: module.DesktopReportContent})),
);

/**
 * Виджет отчётов с вкладками: продажи, клиенты, задачи.
 */
export const ReportsContent = () => {
    const isMobile = useIsMobile();

    return (
        <Suspense fallback={<Preloader />}>{isMobile ? <MobileReportContent /> : <DesktopReportContent />}</Suspense>
    );
};
