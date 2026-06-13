import {useIsMobile} from '@/shared/lib/hooks';

import {lazy, Suspense} from 'react';
import {Preloader} from '@/shared/ui/preloader';

const MobileDealsList = lazy(() => import('./mobile').then((module) => ({default: module.MobileDealsList})));
const DesktopDealsList = lazy(() => import('./desktop').then((module) => ({default: module.DesktopDealsList})));

/**
 * Список сделок. Отображает мобильную или десктопную версию в зависимости от ширины экрана.
 */
export const DealsList = () => {
    const isMobile = useIsMobile();

    return <Suspense fallback={<Preloader />}>{isMobile ? <MobileDealsList /> : <DesktopDealsList />}</Suspense>;
};
