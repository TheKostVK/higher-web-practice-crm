import {useCallback, useMemo, useState, type ReactNode} from 'react';

import {AppMenuContext} from './AppMenuContext.ts';
import {useIsMobile} from '@/shared/lib/hooks';

export const AppMenuProvider = ({children}: {children: ReactNode}) => {
    const isMobile = useIsMobile();
    const [collapsed, setCollapsed] = useState(isMobile);

    const toggleCollapsed = useCallback(() => {
        setCollapsed((prev) => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        if (isMobile) {
            setCollapsed(true);
        }
    }, [isMobile]);

    const contextValue = useMemo(
        () => ({
            collapsed,
            toggleCollapsed,
            closeMenu,
        }),
        [closeMenu, collapsed, toggleCollapsed],
    );

    return <AppMenuContext.Provider value={contextValue}>{children}</AppMenuContext.Provider>;
};
