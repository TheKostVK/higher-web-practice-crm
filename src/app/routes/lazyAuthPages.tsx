import {lazy} from 'react';

export const WelcomePage = lazy(() =>
  import('../../pages/welcome').then((module) => ({default: module.WelcomePage})),
);
export const LoginPage = lazy(() => import('../../pages/login').then((module) => ({default: module.LoginPage})));
export const RegistrationPage = lazy(() =>
  import('../../pages/registration').then((module) => ({default: module.RegistrationPage})),
);
export const ForgotPasswordPage = lazy(() =>
  import('../../pages/forgot-password').then((module) => ({default: module.ForgotPasswordPage})),
);
export const ConfirmEmailPage = lazy(() =>
  import('../../pages/confirm-email').then((module) => ({default: module.ConfirmEmailPage})),
);
