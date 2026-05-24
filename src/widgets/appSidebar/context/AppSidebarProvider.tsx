import {useCallback, useMemo, useState, type ReactNode} from 'react';

import {AppSidebarContext} from './AppSidebarContext.ts';

export const AppSidebarProvider = ({children}: { children: ReactNode }) => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = useCallback(() => {
        setCollapsed((prev) => !prev);
    }, []);

    const contextValue = useMemo(() => ({
        collapsed,
        toggleCollapsed,
    }), [collapsed, toggleCollapsed]);

    return (
        <AppSidebarContext.Provider
            value={contextValue}
        >
            {children}
        </AppSidebarContext.Provider>
    );
};
