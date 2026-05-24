import {Suspense, type ReactElement} from 'react';
import {createBrowserRouter, Navigate} from 'react-router-dom'

import {ProtectedRoute} from "./ProtectedRoute";
import {Preloader} from "@/shared/ui/preloader";
import {AuthLayout} from "@/pages/layout/AuthLayout";
import {MainLayout} from "@/pages/layout/MainLayout";
import {StubPage} from "../../pages/StubPage.tsx";
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
                element: <StubPage/>
            },
            {
                path: 'clients',
                element: <StubPage/>
            },
            {
                path: 'deals',
                element: <StubPage/>
            },
            {
                path: 'reports',
                element: <StubPage/>
            },
            {
                path: 'tasks',
                element: <StubPage/>
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
