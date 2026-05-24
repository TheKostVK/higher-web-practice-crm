import {zodResolver} from '@hookform/resolvers/zod';
import {Button, Input} from "antd";
import {Controller, useForm} from 'react-hook-form';
import {useLocation, useNavigate} from 'react-router-dom';

import {setUserProfileData, useLoginUserMutation} from '../../entities/user';
import {useAppDispatch} from '../../app';
import Styles from './loginPage.module.css';
import {loginSchema, type LoginFormValues} from './loginSchema';

type LocationState = {
    from?: {
        pathname?: string;
    };
};

export const LoginPage = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [loginUser, {isLoading}] = useLoginUserMutation();
    const {
        control,
        handleSubmit,
        setError,
        formState: {errors}
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const redirectPath = (location.state as LocationState | null)?.from?.pathname || '/';

    const handleLogin = async (values: LoginFormValues) => {
        try {
            const user = await loginUser(values).unwrap();

            if (!user) {
                setError('root', {
                    message: 'Неверный email или пароль',
                });
                return;
            }

            dispatch(setUserProfileData(user));
            navigate(redirectPath, {replace: true});
        } catch {
            setError('root', {
                message: 'Не удалось выполнить вход. Попробуйте ещё раз',
            });
        }
    };

    return (
        <section className={Styles.loginPage}>
            <h2 className={Styles.loginPage__title}>Вход в аккаунт</h2>
            <form className={Styles.loginPage__form} onSubmit={handleSubmit(handleLogin)} noValidate>
                <label className={Styles.loginPage__field} htmlFor="login-email">
                    <span className={Styles.loginPage__label}>Email <span aria-hidden="true">*</span></span>
                    <Controller
                        control={control}
                        name="email"
                        render={({field}) => (
                            <Input
                                {...field}
                                id="login-email"
                                status={errors.email ? 'error' : undefined}
                                placeholder="ivanov@yandex.ru"
                                autoComplete="email"
                            />
                        )}
                    />
                    {errors.email && <span className={Styles.loginPage__error}>{errors.email.message}</span>}
                </label>

                <label className={Styles.loginPage__field} htmlFor="login-password">
                    <span className={Styles.loginPage__label}>Пароль <span aria-hidden="true">*</span></span>
                    <Controller
                        control={control}
                        name="password"
                        render={({field}) => (
                            <Input.Password
                                {...field}
                                id="login-password"
                                status={errors.password ? 'error' : undefined}
                                placeholder="******"
                                autoComplete="current-password"
                            />
                        )}
                    />
                    {errors.password && <span className={Styles.loginPage__error}>{errors.password.message}</span>}
                    <Button
                        className={Styles.loginPage__passwordButton}
                        type="link"
                        htmlType="button"
                        onClick={() => navigate('/auth/forgot-password')}
                    >
                        Забыли пароль?
                    </Button>
                </label>

                {errors.root && <p className={Styles.loginPage__formError}>{errors.root.message}</p>}

                <Button className={Styles.loginPage__submit} type="primary" htmlType="submit" loading={isLoading}>
                    Войти
                </Button>
            </form>
        </section>
    );
};
