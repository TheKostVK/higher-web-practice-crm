import {PageTitle} from '@/shared/ui/pageTitle';
import {DealsList} from '@/widgets/dealsList';

import {MainSection} from "@/shared/ui/mainSection";

/**
 * Страница управления сделками.
 */
export const DealsPage = () => (
    <MainSection>
        <PageTitle title="Сделки"/>
        <DealsList/>
    </MainSection>
);
