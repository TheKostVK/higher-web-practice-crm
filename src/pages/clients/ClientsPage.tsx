import {PageTitle} from '@/shared/ui/pageTitle';
import {ClientsList} from '@/widgets/clientsList';

import {MainSection} from '@/shared/ui/mainSection';

/**
 * Страница управления клиентами.
 */
export const ClientsPage = () => (
    <MainSection>
        <PageTitle title="Клиенты" />
        <ClientsList />
    </MainSection>
);
