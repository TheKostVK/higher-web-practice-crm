import {useIsMobile} from '@/shared/lib/hooks';
import {lazy, Suspense} from 'react';
import {Preloader} from '@/shared/ui/preloader';

const DesktopDashboard = lazy(() => import('./desktop').then((module) => ({default: module.DesktopDashboard})));
const MobileDashboard = lazy(() => import('./mobile').then((module) => ({default: module.MobileDashboard})));

export const MainDashboard = () => {
    const isMobile = useIsMobile();

    return (
        <Suspense fallback={<Preloader/>}>
            {isMobile ? <MobileDashboard/> : <DesktopDashboard/>}
        </Suspense>
    );
};
