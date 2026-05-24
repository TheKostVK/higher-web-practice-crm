import Styles from './profileSidebar.module.css';
import {useAppSelector} from "@/app";
import {selectorUserData} from "@/entities/user";
import {useContext} from "react";
import {AppSidebarContext} from "../../context";
import {NavLink} from "react-router-dom";

// API не возвращает аватарку - используется заглушка
export const ProfileSidebar = () => {
    const {collapsed} = useContext(AppSidebarContext);
    const user = useAppSelector(selectorUserData);
    const userName = user?.name ?? 'Имя пользователя'

    return (
        <NavLink
            to={'/profile'}
            aria-label={`Профиль: ${userName}`}
            title={userName}
            className={`${Styles.profileSidebar} ${collapsed ? Styles.profileSidebar_collapsed : ''}`}
        >
            <img className={Styles.profileSidebar__img} src="/mainProfilePhoto.PNG" alt={'Картинка профиля'}/>
            <p className={Styles.profileSidebar__userName}>{userName}</p>
        </NavLink>
    );
};
