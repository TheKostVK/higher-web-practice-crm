import {Outlet, useLocation, useNavigate} from "react-router-dom";

import Logo from './assets/logo.svg';
import Styles from './authLayout.module.css';
import {Button} from "antd";
import {Container} from "../../../shared/ui/container";
import {useCallback} from "react";

export const AuthLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isLoginPage = location.pathname === '/auth/login';

    const textData = {
        title: isLoginPage ? 'У вас ещё нет аккаунта?' : 'Уже зарегистрированы?',
        btnText: isLoginPage ? 'Зарегистрироваться' : 'Войти в аккаунт'
    };

    const handleClick = useCallback(() => {
        if (isLoginPage) {
            navigate('/auth/registration');
            return;
        }

        navigate('/auth/login');
    }, [isLoginPage, navigate]);

    return (
        <main className={Styles.authLayout}>
            <div className={Styles.authLayout__leftSide}>
                <div className={Styles.authLayout__content}>
                    <img className={Styles.content__logo} src={Logo} alt={'Логотип YaPlex'}/>
                    <p className={Styles.content__mainText}>
                        Платформа для управления клиентами, сделками и задачами.
                        Эффективно управляйте бизнес-процессами,
                        отслеживайте ключевые показатели и выстраивайте продуктивные отношения с клиентами.
                    </p>
                </div>
                <div className={Styles.authLayout__action}>
                    <p className={Styles.action__text}>
                        {textData.title}
                    </p>
                    <Button
                        className={Styles.action__btn}
                        variant="link"
                        color="primary"
                        onClick={handleClick}
                    >
                        {textData.btnText}
                    </Button>
                </div>
            </div>
            <div className={Styles.authLayout__rightSide}>
                <Container>
                    <Outlet/>
                </Container>
            </div>
        </main>
    );
};
