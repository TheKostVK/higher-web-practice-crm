import {Outlet} from 'react-router-dom';

import Logo from '@/shared/assets/logo.svg';
import {Button} from '@/shared/ui/button';
import {LayoutContainer} from '@/shared/ui/layoutContainer';
import {useAuthSwitchAction} from '../../../lib';
import Styles from './authLayoutDesktop.module.css';

export const AuthLayoutDesktop = () => {
  const {isLoginPage, handleClick} = useAuthSwitchAction();

  const textData = {
    title: isLoginPage ? 'У вас ещё нет аккаунта?' : 'Уже зарегистрированы?',
    btnText: isLoginPage ? 'Зарегистрироваться' : 'Войти в аккаунт',
  };

  return (
    <main className={Styles.authLayoutDesktop}>
      <div className={Styles.authLayoutDesktop__leftSide}>
        <div className={Styles.authLayoutDesktop__content}>
          <img className={Styles.content__logo} src={Logo} alt={'Логотип YaPlex'} />
          <p className={Styles.content__mainText}>
            Платформа для управления клиентами, сделками и задачами. Эффективно управляйте бизнес-процессами,
            отслеживайте ключевые показатели и выстраивайте продуктивные отношения с клиентами.
          </p>
        </div>
        <div className={Styles.authLayoutDesktop__action}>
          <p className={Styles.action__text}>{textData.title}</p>
          <Button className={Styles.action__btn} view="link" onClick={handleClick}>
            {textData.btnText}
          </Button>
        </div>
      </div>
      <div className={Styles.authLayoutDesktop__rightSide}>
        <LayoutContainer>
          <Outlet />
        </LayoutContainer>
      </div>
    </main>
  );
};
