import {lazy, Suspense} from 'react';

import {useIsMobile} from '@/shared/lib/hooks';
import {Preloader} from '@/shared/ui/preloader';

const AuthLayoutDesktop = lazy(() =>
    import('./desktop/ui/authLayoutDesktop').then(({AuthLayoutDesktop}) => ({
        default: AuthLayoutDesktop,
    })),
);

const AuthLayoutMobile = lazy(() =>
    import('./mobile/ui/authLayoutMobile').then(({AuthLayoutMobile}) => ({
        default: AuthLayoutMobile,
    })),
);

export const AuthLayout = () => {
    const isMobile = useIsMobile();

    return (
        <Suspense fallback={<Preloader />}>{isMobile ? <AuthLayoutMobile /> : <AuthLayoutDesktop />}</Suspense>
    );
};
