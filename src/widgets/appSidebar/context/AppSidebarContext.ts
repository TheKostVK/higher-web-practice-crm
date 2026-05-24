import {createContext} from 'react';

export interface AppSidebarContextValue {
    collapsed: boolean;
    toggleCollapsed: () => void;
}

export const AppSidebarContext = createContext<AppSidebarContextValue>({
    collapsed: false,
    toggleCollapsed: () => {
    },
});
