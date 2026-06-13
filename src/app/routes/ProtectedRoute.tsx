import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../redux';
import {Navigate, useLocation} from 'react-router-dom';
import {initUser, selectorUserData, selectorUserIsInit} from '@/entities/user';
import {Preloader} from '@/shared/ui/preloader';
import type {ReactElement} from 'react';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};

export const ProtectedRoute = ({onlyUnAuth, children}: TProtectedRouteProps) => {
    const isInit = useAppSelector(selectorUserIsInit);
    const user = useAppSelector(selectorUserData);
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        if (!isInit) {
            dispatch(initUser());
        }
    }, [dispatch, isInit]);

    if (!isInit) {
        return <Preloader />;
    }

    if (!onlyUnAuth && !user) {
        return <Navigate replace to="/auth/login" state={{from: location}} />;
    }

    if (onlyUnAuth && user) {
        const from = location.state?.from || {pathname: '/'};

        return <Navigate replace to={from} />;
    }

    return children;
};
