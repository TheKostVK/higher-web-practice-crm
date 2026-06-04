import {memo, useContext} from "react";
import {NavLink} from "react-router-dom";

import Styles from './listItem.module.css';
import {AppMenuContext} from "../../context";
import type {AppSidebarItem} from "@/widgets/appSidebar/types/types";

export type ListItemProps = {
    item: AppSidebarItem
};

export const ListItem = memo(({item}: ListItemProps) => {
    const {collapsed, closeMenu} = useContext(AppMenuContext);

    return (
        <NavLink
            to={item.pathname}
            end={item.pathname === '/'}
            aria-label={item.title}
            title={item.title}
            onClick={closeMenu}
            className={({isActive}) => `${Styles.listItem} ${isActive ? Styles.listItem_active : ''} ${collapsed ? Styles.listItem_collapsed : ''}`}
        >
            {item.icon}
            <span className={Styles.listItem__title}>
                {item.title}
            </span>
        </NavLink>
    );
});
