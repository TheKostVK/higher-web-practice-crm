import {useIsMobile} from '@/shared/lib/hooks';

import {lazy, Suspense} from 'react';
import {Preloader} from '@/shared/ui/preloader';

const MobileTasksList = lazy(() => import('./mobile').then((module) => ({default: module.MobileTasksList})));
const DesktopTasksList = lazy(() => import('./desktop').then((module) => ({default: module.DesktopTasksList})));

/**
 * Список задач. Отображает мобильную или десктопную версию в зависимости от ширины экрана.
 */
export const TasksList = () => {
    const isMobile = useIsMobile();

    return <Suspense fallback={<Preloader />}>{isMobile ? <MobileTasksList /> : <DesktopTasksList />}</Suspense>;
};
