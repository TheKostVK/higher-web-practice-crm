import {Navigate, useNavigate} from 'react-router-dom';

import Logo from '@/shared/assets/logo.svg';
import {useIsMobile} from '@/shared/lib/hooks';
import {Button} from '@/shared/ui/button';
import Styles from './welcomePage.module.css';

export const WelcomePage = () => {
    const isMobile = useIsMobile();
    const navigate = useNavigate();

    if (!isMobile) {
        return <Navigate to="/auth/login" replace />;
    }

    return (
        <section className={Styles.welcomePage}>
            <div className={Styles.welcomePage__content}>
                <img className={Styles.welcomePage__logo} src={Logo} alt="Логотип YaPlex" />
                <p className={Styles.welcomePage__text}>
          Платформа для управления клиентами, сделками и задачами. Эффективно управляйте бизнес-процессами,
          отслеживайте ключевые показатели и выстраивайте продуктивные отношения с клиентами.
                </p>
            </div>
            <div className={Styles.welcomePage__actions}>
                <Button fullWidth view="primary" onClick={() => navigate('/auth/login')}>
          Войти
                </Button>
                <Button fullWidth view="outline" onClick={() => navigate('/auth/registration')}>
          Регистрация
                </Button>
            </div>
        </section>
    );
};
