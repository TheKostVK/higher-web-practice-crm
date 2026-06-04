import {Suspense, type ReactElement} from 'react';
import {createBrowserRouter, Navigate} from 'react-router-dom'

import {ProtectedRoute} from "./ProtectedRoute";
import {Preloader} from "@/shared/ui/preloader";
import {AuthLayout} from "@/pages/layout/AuthLayout";
import {MainLayout} from "@/pages/layout/MainLayout";
import {DashboardPage} from "@/pages/dashboard";
import {
    ConfirmEmailPage,
    ForgotPasswordPage,
    LoginPage,
    RegistrationPage
} from './lazyAuthPages.tsx';

const withSuspense = (element: ReactElement) => (
    <Suspense fallback={<Preloader/>}>
        {element}
    </Suspense>
);

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <MainLayout/>
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <DashboardPage/>
            },
            {
                path: 'clients',
                element: <DashboardPage/>
            },
            {
                path: 'deals',
                element: <DashboardPage/>
            },
            {
                path: 'reports',
                element: <DashboardPage/>
            },
            {
                path: 'tasks',
                element: <DashboardPage/>
            },
            {
                path: 'profile',
                element: <DashboardPage/>
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout/>,
        children: [
            {
                index: true,
                element: <Navigate to="login" replace/>
            },
            {
                path: 'login',
                element: withSuspense(
                    <ProtectedRoute onlyUnAuth>
                        <LoginPage/>
                    </ProtectedRoute>
                )
            },
            {
                path: 'registration',
                element: withSuspense(
                    <ProtectedRoute onlyUnAuth>
                        <RegistrationPage/>
                    </ProtectedRoute>
                )
            },
            {
                path: 'forgot-password',
                element: withSuspense(
                    <ProtectedRoute onlyUnAuth>
                        <ForgotPasswordPage/>
                    </ProtectedRoute>
                )
            },
            {
                path: 'confirm-email',
                element: withSuspense(
                    <ProtectedRoute onlyUnAuth>
                        <ConfirmEmailPage/>
                    </ProtectedRoute>
                )
            }
        ]
    }
])
