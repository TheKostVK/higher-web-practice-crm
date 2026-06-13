import {createContext} from 'react';

export interface AppMenuContextValue {
    collapsed: boolean;
    toggleCollapsed: () => void;
    closeMenu: () => void;
}

export const AppMenuContext = createContext<AppMenuContextValue>({
    collapsed: false,
    toggleCollapsed: () => {},
    closeMenu: () => {},
});
