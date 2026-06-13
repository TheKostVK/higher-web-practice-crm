import {Outlet} from 'react-router-dom';

import {Button} from '@/shared/ui/button';
import {useAuthSwitchAction} from '../../../lib';
import Styles from './authLayoutMobile.module.css';

export const AuthLayoutMobile = () => {
    const {isLoginPage, isWelcomePage, handleClick} = useAuthSwitchAction();

    const textData = {
        title: isLoginPage ? 'Нет аккаунта?' : 'Уже зарегистрированы?',
        btnText: isLoginPage ? 'Зарегистрироваться' : 'Войти в аккаунт',
    };

    return (
        <main className={Styles.authLayoutMobile}>
            <div className={Styles.authLayoutMobile__content}>
                <Outlet />
            </div>
            {!isWelcomePage && (
                <div className={Styles.authLayoutMobile__switch}>
                    <p className={Styles.switch__text}>{textData.title}</p>
                    <Button className={Styles.switch__btn} view="link" onClick={handleClick}>
                        {textData.btnText}
                    </Button>
                </div>
            )}
        </main>
    );
};
