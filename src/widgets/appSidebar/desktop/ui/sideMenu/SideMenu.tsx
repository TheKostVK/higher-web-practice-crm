import {Button} from 'antd';
import {NavLink} from 'react-router-dom';

import Logo from '../../../assetes/logo/YaPlex+Logo.svg';
import OpenIcon from './assets/sideMenuOpen.svg?react';
import CloseIcon from './assets/sideMenuClose.svg?react';

import Styles from './sideMenu.module.css';
import {type ReactNode, useContext} from 'react';
import {AppMenuContext} from '../../../context';
import {ProfileMenuItem} from '@/widgets/appSidebar/ui/profileMenuItem';

type TSideMenuProps = {
  children: ReactNode;
};

export const SideMenu = ({children}: TSideMenuProps) => {
  const {collapsed, toggleCollapsed} = useContext(AppMenuContext);

  return (
    <div className={`${Styles.sideMenu} ${collapsed ? Styles['sideMenu--collapsed'] : ''}`}>
      <div className={Styles.sideMenu__header}>
        <NavLink to={'/'} className={Styles.sideMenu__logoLink} aria-label="На главную страницу">
          <img className={Styles.sideMenu__logo} src={Logo} alt="YaPlex" />
        </NavLink>
        <Button
          aria-label={collapsed ? 'Раскрыть меню' : 'Свернуть меню'}
          className={Styles.sideMenu__trigger}
          type="text"
          icon={collapsed ? <OpenIcon /> : <CloseIcon />}
          onClick={toggleCollapsed}
        />
      </div>
      <div className={Styles.sideMenu__content}>{children}</div>
      <div className={Styles.sideMenu__footer}>
        <ProfileMenuItem />
      </div>
    </div>
  );
};
