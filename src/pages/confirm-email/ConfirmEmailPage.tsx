import {zodResolver} from '@hookform/resolvers/zod';
import {Button, Input} from 'antd';
import {Controller, useForm} from 'react-hook-form';

import Styles from './confirmEmailPage.module.css';
import {confirmEmailSchema, type TConfirmEmailFormValues} from './confirmEmailSchema';

export const ConfirmEmailPage = () => {
    const {
        control,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<TConfirmEmailFormValues>({
        resolver: zodResolver(confirmEmailSchema),
        defaultValues: {
            confirmationLink: '',
        },
    });

    const handleConfirmEmail = async () => Promise.resolve();

    const handleResend = () => undefined;

    return (
        <section className={Styles.confirmEmailPage}>
            <h2 className={Styles.confirmEmailPage__title}>Подтверждение почты</h2>
            <p className={Styles.confirmEmailPage__description}>Вставьте ссылку из полученного письма</p>
            <form className={Styles.confirmEmailPage__form} onSubmit={handleSubmit(handleConfirmEmail)} noValidate>
                <label className={Styles.confirmEmailPage__field} htmlFor="confirm-email-link">
                    <span className={Styles.confirmEmailPage__label}>
            Ссылка подтверждения <span aria-hidden="true">*</span>
                    </span>
                    <Controller
                        control={control}
                        name="confirmationLink"
                        render={({field}) => (
                            <Input
                                {...field}
                                id="confirm-email-link"
                                status={errors.confirmationLink ? 'error' : undefined}
                                placeholder="https://example.com/confirm"
                                autoComplete="url"
                            />
                        )}
                    />
                    {errors.confirmationLink && (
                        <span className={Styles.confirmEmailPage__error}>{errors.confirmationLink.message}</span>
                    )}
                </label>

                <Button className={Styles.confirmEmailPage__submit} type="primary" htmlType="submit" loading={isSubmitting}>
          Подтвердить
                </Button>
            </form>

            <div className={Styles.confirmEmailPage__resend}>
                <p className={Styles.confirmEmailPage__resendText}>Не пришло письмо?</p>
                <Button className={Styles.confirmEmailPage__resendButton} htmlType="button" onClick={handleResend}>
          Отправить повторно
                </Button>
            </div>
        </section>
    );
};
