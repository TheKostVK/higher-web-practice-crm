import {Controller, type Control, type FieldErrors} from 'react-hook-form';
import {FormPasswordInput} from '@/shared/ui/formInput';
import type {TProfileFormValues} from '../../model';
import Styles from './passwordSection.module.css';

type TPasswordSectionProps = {
    control: Control<TProfileFormValues>;
    errors: FieldErrors<TProfileFormValues>;
};

export const PasswordSection = ({control, errors}: TPasswordSectionProps) => (
    <section className={Styles.passwordSection} aria-labelledby="profile-password-title">
        <h2 className={Styles.passwordSection__title} id="profile-password-title">
            Пароль
        </h2>

        <div className={Styles.passwordSection__fields}>
            <Controller
                control={control}
                name="currentPassword"
                render={({field}) => (
                    <FormPasswordInput
                        id="profile-current-password"
                        label="Существующий пароль"
                        name={field.name}
                        value={field.value}
                        error={errors.currentPassword?.message}
                        autoComplete="current-password"
                        placeholder="*******"
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                    />
                )}
            />

            <span className={Styles.passwordSection__spacer} aria-hidden="true"/>

            <Controller
                control={control}
                name="newPassword"
                render={({field}) => (
                    <FormPasswordInput
                        id="profile-new-password"
                        label="Новый пароль"
                        name={field.name}
                        value={field.value}
                        error={errors.newPassword?.message}
                        autoComplete="new-password"
                        placeholder="*******"
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                    />
                )}
            />

            <Controller
                control={control}
                name="confirmPassword"
                render={({field}) => (
                    <FormPasswordInput
                        id="profile-confirm-password"
                        label="Повторите пароль"
                        name={field.name}
                        value={field.value}
                        error={errors.confirmPassword?.message}
                        autoComplete="new-password"
                        placeholder="*******"
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                    />
                )}
            />
        </div>
    </section>
);
