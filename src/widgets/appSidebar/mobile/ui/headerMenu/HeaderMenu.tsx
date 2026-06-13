import {Button} from 'antd';

import Logo from '../../../assetes/logo/logo.svg';
import OpenIcon from './assets/headerMenuOpen.svg?react';
import CloseIcon from './assets/headerMenuClose.svg?react';

import Styles from './headerMenu.module.css';
import {type ReactNode, useContext, useEffect} from 'react';
import {AppMenuContext} from '../../../context';
import {ProfileMenuItem} from '@/widgets/appSidebar/ui/profileMenuItem';
import {NavLink} from 'react-router-dom';

type THeaderMenuProps = {
  children: ReactNode;
};

export const HeaderMenu = ({children}: THeaderMenuProps) => {
  const {collapsed, toggleCollapsed} = useContext(AppMenuContext);

  useEffect(() => {
    if (collapsed) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [collapsed]);

  return (
    <div className={`${Styles.headerMenu} ${collapsed ? '' : Styles['headerMenu--open']}`}>
      <div className={Styles.headerMenu__header}>
        <Button
          aria-label={collapsed ? 'Раскрыть меню' : 'Свернуть меню'}
          className={Styles.headerMenu__trigger}
          type="text"
          icon={collapsed ? <OpenIcon /> : <CloseIcon />}
          onClick={toggleCollapsed}
        />
        <NavLink to={'/'} aria-label={`Главная страница`} title={'Главная страница'}>
          <img className={Styles.headerMenu__logo} src={Logo} alt="YaPlex" />
        </NavLink>
        <ProfileMenuItem isMobile />
      </div>
      {!collapsed && <div className={Styles.headerMenu__content}>{children}</div>}
    </div>
  );
};
