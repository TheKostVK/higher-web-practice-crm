import Styles from './profileMenuItem.module.css';
import {useAppSelector} from '@/app';
import {selectorUserData} from '@/entities/user';
import {memo, useContext, useState} from 'react';
import {AppMenuContext} from '../../context';
import {NavLink} from 'react-router-dom';

import {ProfileAvatar} from '@/shared/ui/profileAvatar';

type TProfileMenuItemProps = {
    isMobile?: boolean;
};

export const ProfileMenuItem = memo(({isMobile = false}: TProfileMenuItemProps) => {
    const {collapsed, closeMenu} = useContext(AppMenuContext);
    const user = useAppSelector(selectorUserData);

    const [isHovered, setIsHovered] = useState(false);

    const userName = user?.name ?? 'Имя пользователя';

    return isMobile ? (
        <NavLink
            to={'/profile'}
            aria-label={`Профиль: ${userName}`}
            title={userName}
            onClick={closeMenu}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={({isActive}) =>
                `${Styles['profileMenuItem--mobile']} ${isActive ? Styles['profileMenuItem--active'] : ''}`
            }
        >
            {({isActive}) => <ProfileAvatar useIcon isActive={isActive || isHovered} alt="Картинка профиля" />}
        </NavLink>
    ) : (
        <NavLink
            to="/profile"
            aria-label={`Профиль: ${userName}`}
            title={userName}
            onClick={closeMenu}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={({isActive}) =>
                `${Styles.profileMenuItem} ${isActive ? Styles['profileMenuItem--active'] : ''} ${collapsed ? Styles['profileSidebar--collapsed'] : ''}`
            }
        >
            {({isActive}) => (
                <>
                    <ProfileAvatar
                        useIcon
                        isActive={isActive || isHovered}
                        src={user?.avatarUrl}
                        alt="Картинка профиля"
                    />

                    <p className={Styles.profileSidebar__userName}>{userName}</p>
                </>
            )}
        </NavLink>
    );
});
