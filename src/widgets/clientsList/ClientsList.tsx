import {useIsMobile} from '@/shared/lib/hooks';

import {lazy, Suspense} from 'react';
import {Preloader} from '@/shared/ui/preloader';

const MobileClientsList = lazy(() => import('./mobile').then((module) => ({default: module.MobileClientsList})));
const DesktopClientsList = lazy(() => import('./desktop').then((module) => ({default: module.DesktopClientsList})));

/**
 * Список клиентов. Отображает мобильную или десктопную версию в зависимости от ширины экрана.
 */
export const ClientsList = () => {
    const isMobile = useIsMobile();

    return <Suspense fallback={<Preloader />}>{isMobile ? <MobileClientsList /> : <DesktopClientsList />}</Suspense>;
};
