import Styles from './profileMenuItem.module.css';
import {useAppSelector} from "@/app";
import {selectorUserData} from "@/entities/user";
import {useContext} from "react";
import {AppMenuContext} from "../../context";
import {NavLink} from "react-router-dom";

import ProfileIconFallBack from './assets/mainProfilePhoto.png';

import MobileProfileIcon from './assets/profileIcon.svg?react';

type TProfileMenuItemProps = {
    isMobile?: boolean;
}

// API не возвращает аватарку - используется заглушка
export const ProfileMenuItem = ({isMobile = false}: TProfileMenuItemProps) => {
    const {collapsed, closeMenu} = useContext(AppMenuContext);
    const user = useAppSelector(selectorUserData);
    const userName = user?.name ?? 'Имя пользователя'

    return (
        isMobile ?
            <NavLink
                to={'/profile'}
                aria-label={`Профиль: ${userName}`}
                title={userName}
                onClick={closeMenu}
                className={({isActive}) => `${Styles.profileMenuItem_mobile} ${isActive ? Styles.profileMenuItem_active : ''}`}
            >
                <MobileProfileIcon/>
            </NavLink>
            :
            <NavLink
                to={'/profile'}
                aria-label={`Профиль: ${userName}`}
                title={userName}
                onClick={closeMenu}
                className={({isActive}) => `${Styles.profileMenuItem} ${isActive ? Styles.profileMenuItem_active : ''} ${collapsed ? Styles.profileSidebar_collapsed : ''}`}
            >
                <img className={Styles.profileSidebar__img} src={ProfileIconFallBack} alt={'Картинка профиля'}/>
                <p className={Styles.profileSidebar__userName}>{userName}</p>
            </NavLink>
    );
};
