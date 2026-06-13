import {Controller, type Control, type FieldErrors} from 'react-hook-form';
import {FormTextInput} from '@/shared/ui/formInput';
import type {TProfileFormValues} from '../../model';
import {EmailConfirmation} from '../emailConfirmation';
import Styles from './profileFields.module.css';

type TProfileFieldsProps = {
    control: Control<TProfileFormValues>;
    errors: FieldErrors<TProfileFormValues>;
    isEmailConfirmationVisible: boolean;
    onSendEmailConfirmation: () => void;
};

export const ProfileFields = ({control, errors, isEmailConfirmationVisible, onSendEmailConfirmation}: TProfileFieldsProps) => (
    <div className={Styles.profileFields}>
        <Controller
            control={control}
            name="firstName"
            render={({field}) => (
                <FormTextInput
                    id="profile-first-name"
                    label="Имя *"
                    name={field.name}
                    value={field.value}
                    error={errors.firstName?.message}
                    autoComplete="given-name"
                    placeholder="Ярополк"
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                />
            )}
        />

        <Controller
            control={control}
            name="lastName"
            render={({field}) => (
                <FormTextInput
                    id="profile-last-name"
                    label="Фамилия *"
                    name={field.name}
                    value={field.value}
                    error={errors.lastName?.message}
                    autoComplete="family-name"
                    placeholder="Иванов"
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                />
            )}
        />

        <Controller
            control={control}
            name="email"
            render={({field}) => (
                <FormTextInput
                    id="profile-email"
                    label="Email *"
                    name={field.name}
                    value={field.value}
                    className={Styles.profileFields__field_email}
                    error={errors.email?.message}
                    isError={isEmailConfirmationVisible}
                    autoComplete="email"
                    placeholder="ivanov@yandex.ru"
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    extra={
                        isEmailConfirmationVisible && (
                            <EmailConfirmation onSendConfirmation={onSendEmailConfirmation} />
                        )
                    }
                />
            )}
        />

        <Controller
            control={control}
            name="accountName"
            render={({field}) => (
                <FormTextInput
                    id="profile-account-name"
                    label="Имя аккаунта *"
                    name={field.name}
                    value={field.value}
                    className={Styles.profileFields__field_accountName}
                    error={errors.accountName?.message}
                    autoComplete="username"
                    placeholder="Yaropolk"
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                />
            )}
        />
    </div>
);
