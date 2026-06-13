import {useCallback} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

export const useAuthSwitchAction = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isLoginPage = location.pathname === '/auth/login';
    const isWelcomePage = location.pathname === '/auth';

    const handleClick = useCallback(() => {
        navigate(isLoginPage ? '/auth/registration' : '/auth/login');
    }, [isLoginPage, navigate]);

    return {isLoginPage, isWelcomePage, handleClick};
};
