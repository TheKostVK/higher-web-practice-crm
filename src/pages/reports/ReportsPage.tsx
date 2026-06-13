import {PageTitle} from '@/shared/ui/pageTitle';
import {ReportsContent} from '@/widgets/reportsContent';
import {useIsMobile} from '@/shared/lib/hooks';
import {MainSection} from '@/shared/ui/mainSection';

/**
 * Страница отчётов.
 */
export const ReportsPage = () => {
    const isMobile = useIsMobile();

    return (
        <MainSection>
            <PageTitle title="Отчёты" subTitle={isMobile ? undefined : 'Анализ продаж, клиентов и задач'} />
            <ReportsContent />
        </MainSection>
    );
};
