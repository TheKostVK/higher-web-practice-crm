import {Button} from "antd";

import SideMenuOpenIcon from './assets/sideMenuOpen.svg?react';
import SideMenuCloseIcon from './assets/sideMenuClose.svg?react';

import Styles from './sideMenu.module.css';
import {type ReactNode, useContext} from "react";
import {AppSidebarContext} from "../../context";

type SideMenuProps = {
    children: ReactNode;
    footerChildren: ReactNode;
}

export const SideMenu = ({children, footerChildren}: SideMenuProps) => {
    const {collapsed, toggleCollapsed} = useContext(AppSidebarContext);

    return (
        <div className={`${Styles.sideMenu} ${collapsed ? Styles.sideMenu_collapsed : ''}`}>
            <div className={Styles.sideMenu__header}>
                <img className={Styles.sideMenu__logo} src="/logo/YaPlex+Logo.svg" alt="YaPlex"/>
                <Button
                    aria-label={collapsed ? 'Раскрыть меню' : 'Свернуть меню'}
                    className={Styles.sideMenu__trigger}
                    type="text"
                    icon={collapsed ? <SideMenuOpenIcon/> : <SideMenuCloseIcon/>}
                    onClick={toggleCollapsed}
                />
            </div>
            <div className={Styles.sideMenu__content}>
                {children}
            </div>
            <div className={Styles.sideMenu__footer}>
                {footerChildren}
            </div>
        </div>
    )
};
