import {memo, useContext} from "react";
import {NavLink} from "react-router-dom";

import Styles from './listItem.module.css';
import {AppMenuContext} from "../../context";
import type {TAppSidebarItem} from "@/widgets/appSidebar/types/types";

export type TListItemProps = {
    item: TAppSidebarItem
};

export const ListItem = memo(({item}: TListItemProps) => {
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
