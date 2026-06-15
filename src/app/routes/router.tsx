import {Suspense, type ReactElement} from 'react';
import {createBrowserRouter} from 'react-router-dom';

import {ProtectedRoute} from './ProtectedRoute';
import {Preloader} from '@/shared/ui/preloader';
import {AuthLayout} from '@/pages/layout/AuthLayout';
import {MainLayout} from '@/pages/layout/MainLayout';
import {ConfirmEmailPage, ForgotPasswordPage, LoginPage, RegistrationPage, WelcomePage} from './lazyAuthPages.tsx';

const withSuspense = (element: ReactElement) => <Suspense fallback={<Preloader />}>{element}</Suspense>;

export const router = createBrowserRouter(
    [
        {
            path: '/*',
            element: (
                <ProtectedRoute>
                    <MainLayout />
                </ProtectedRoute>
            ),
        },
        {
            path: '/auth',
            element: <AuthLayout />,
            children: [
                {
                    index: true,
                    element: withSuspense(
                        <ProtectedRoute onlyUnAuth>
                            <WelcomePage />
                        </ProtectedRoute>,
                    ),
                },
                {
                    path: 'login',
                    element: withSuspense(
                        <ProtectedRoute onlyUnAuth>
                            <LoginPage />
                        </ProtectedRoute>,
                    ),
                },
                {
                    path: 'registration',
                    element: withSuspense(
                        <ProtectedRoute onlyUnAuth>
                            <RegistrationPage />
                        </ProtectedRoute>,
                    ),
                },
                {
                    path: 'forgot-password',
                    element: withSuspense(
                        <ProtectedRoute onlyUnAuth>
                            <ForgotPasswordPage />
                        </ProtectedRoute>,
                    ),
                },
                {
                    path: 'confirm-email',
                    element: withSuspense(
                        <ProtectedRoute onlyUnAuth>
                            <ConfirmEmailPage />
                        </ProtectedRoute>,
                    ),
                },
            ],
        },
    ],
    {
        basename: import.meta.env.BASE_URL,
    },
);
