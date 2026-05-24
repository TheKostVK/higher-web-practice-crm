import {useContext} from "react";
import {NavLink} from "react-router-dom";

import Styles from './listItem.module.css';
import {AppSidebarContext} from "../../context";
import type {AppSidebarItem} from "@/widgets/appSidebar/types/types";

export type ListItemProps = {
    item: AppSidebarItem
};

export const ListItem = ({item}: ListItemProps) => {
    const {collapsed} = useContext(AppSidebarContext);

    return (
        <NavLink
            to={item.pathname}
            end={item.pathname === '/'}
            aria-label={item.title}
            title={item.title}
            className={({isActive}) => `${Styles.listItem} ${isActive ? Styles.listItem_active : ''} ${collapsed ? Styles.listItem_collapsed : ''}`}
        >
            {item.icon}
            <span className={Styles.listItem__title}>
                {item.title}
            </span>
        </NavLink>
    );
};
