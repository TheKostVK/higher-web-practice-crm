import {zodResolver} from '@hookform/resolvers/zod';
import {Button, Input} from 'antd';
import {Controller, useForm} from 'react-hook-form';
import {useLocation, useNavigate} from 'react-router-dom';

import {
    setUserProfileData,
    useLazyGetUsersByEmailQuery,
    useRegisterUserMutation
} from '../../entities/user';
import {useAppDispatch} from '../../app';
import Styles from './registrationPage.module.css';
import {registrationSchema, type RegistrationFormValues} from './registrationSchema';

type LocationState = {
    from?: {
        pathname?: string;
    };
};

export const RegistrationPage = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [getUsersByEmail] = useLazyGetUsersByEmailQuery();
    const [registerUser, {isLoading}] = useRegisterUserMutation();
    const {
        control,
        handleSubmit,
        setError,
        formState: {errors}
    } = useForm<RegistrationFormValues>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const redirectPath = (location.state as LocationState | null)?.from?.pathname || '/';

    const handleRegistration = async ({confirmPassword, ...values}: RegistrationFormValues) => {
        void confirmPassword;

        try {
            const users = await getUsersByEmail(values.email).unwrap();

            if (users.length > 0) {
                setError('email', {
                    message: 'Пользователь с таким email уже существует',
                });
                return;
            }

            const user = await registerUser(values).unwrap();

            dispatch(setUserProfileData(user));
            navigate(redirectPath, {replace: true});
        } catch {
            setError('root', {
                message: 'Не удалось зарегистрироваться. Попробуйте ещё раз',
            });
        }
    };

    return (
        <section className={Styles.registrationPage}>
            <h2 className={Styles.registrationPage__title}>Регистрация</h2>
            <form className={Styles.registrationPage__form} onSubmit={handleSubmit(handleRegistration)} noValidate>
                <label className={Styles.registrationPage__field} htmlFor="registration-name">
                    <span className={Styles.registrationPage__label}>Имя <span aria-hidden="true">*</span></span>
                    <Controller
                        control={control}
                        name="name"
                        render={({field}) => (
                            <Input
                                {...field}
                                id="registration-name"
                                status={errors.name ? 'error' : undefined}
                                placeholder="Ярополк"
                                autoComplete="given-name"
                            />
                        )}
                    />
                    {errors.name && <span className={Styles.registrationPage__error}>{errors.name.message}</span>}
                </label>

                <label className={Styles.registrationPage__field} htmlFor="registration-email">
                    <span className={Styles.registrationPage__label}>Email <span aria-hidden="true">*</span></span>
                    <Controller
                        control={control}
                        name="email"
                        render={({field}) => (
                            <Input
                                {...field}
                                id="registration-email"
                                status={errors.email ? 'error' : undefined}
                                placeholder="ivanov@yandex.ru"
                                autoComplete="email"
                            />
                        )}
                    />
                    {errors.email && <span className={Styles.registrationPage__error}>{errors.email.message}</span>}
                </label>

                <label className={Styles.registrationPage__field} htmlFor="registration-password">
                    <span className={Styles.registrationPage__label}>Придумайте пароль <span aria-hidden="true">*</span></span>
                    <Controller
                        control={control}
                        name="password"
                        render={({field}) => (
                            <Input.Password
                                {...field}
                                id="registration-password"
                                status={errors.password ? 'error' : undefined}
                                placeholder="******"
                                autoComplete="new-password"
                            />
                        )}
                    />
                    {errors.password && <span className={Styles.registrationPage__error}>{errors.password.message}</span>}
                </label>

                <label className={Styles.registrationPage__field} htmlFor="registration-confirm-password">
                    <span className={Styles.registrationPage__label}>Повторите пароль <span aria-hidden="true">*</span></span>
                    <Controller
                        control={control}
                        name="confirmPassword"
                        render={({field}) => (
                            <Input.Password
                                {...field}
                                id="registration-confirm-password"
                                status={errors.confirmPassword ? 'error' : undefined}
                                placeholder="******"
                                autoComplete="new-password"
                            />
                        )}
                    />
                    {errors.confirmPassword && (
                        <span className={Styles.registrationPage__error}>{errors.confirmPassword.message}</span>
                    )}
                </label>

                {errors.root && <p className={Styles.registrationPage__formError}>{errors.root.message}</p>}

                <Button
                    className={Styles.registrationPage__submit}
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                >
                    Зарегистрироваться
                </Button>
            </form>
        </section>
    );
};
