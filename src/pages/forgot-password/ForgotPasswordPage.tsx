import {zodResolver} from '@hookform/resolvers/zod';
import {Button, Input} from 'antd';
import {Controller, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';

import Styles from './forgotPasswordPage.module.css';
import {forgotPasswordSchema, type TForgotPasswordFormValues} from './forgotPasswordSchema';

export const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<TForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
        },
    });

    const handleRestorePassword = async () => {
        navigate('/auth/confirm-email');
    };

    return (
        <section className={Styles.forgotPasswordPage}>
            <h2 className={Styles.forgotPasswordPage__title}>Восстановление пароля</h2>
            <p className={Styles.forgotPasswordPage__description}>
                Укажите почту, на которую вы регистрировали аккаунт, и мы отправим вам инструкцию по восстановлению
                пароля.
            </p>
            <form className={Styles.forgotPasswordPage__form} onSubmit={handleSubmit(handleRestorePassword)} noValidate>
                <label className={Styles.forgotPasswordPage__field} htmlFor="forgot-password-email">
                  <span className={Styles.forgotPasswordPage__label}>
                    Email <span aria-hidden="true">*</span>
                  </span>
                    <Controller
                        control={control}
                        name="email"
                        render={({field}) => (
                            <Input
                                {...field}
                                id="forgot-password-email"
                                status={errors.email ? 'error' : undefined}
                                placeholder="ivanov@yandex.ru"
                                autoComplete="email"
                            />
                        )}
                    />
                    {errors.email && <span className={Styles.forgotPasswordPage__error}>{errors.email.message}</span>}
                </label>

                <Button className={Styles.forgotPasswordPage__submit} type="primary" htmlType="submit"
                        loading={isSubmitting}>
                    Восстановить
                </Button>
            </form>
        </section>
    );
};
