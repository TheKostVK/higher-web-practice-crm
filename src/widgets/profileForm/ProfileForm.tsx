import {type ChangeEvent, useEffect, useState} from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm, useWatch} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from "@/app";
import {
    clearUserProfileData,
    selectorUserData,
    setUserProfileData,
    type UserProfile,
    useDeleteUserMutation,
    useLazyGetUsersByEmailQuery,
    useUpdateUserProfileMutation
} from "@/entities/user";
import {AvatarUpload} from "@/shared/ui/avatarUpload";
import {Button} from "@/shared/ui/button";
import {Container} from "@/shared/ui/container";
import {FormPasswordInput, FormTextInput} from "@/shared/ui/formInput";
import Styles from './profileForm.module.css';
import {profileFormSchema, type ProfileFormValues} from './model';

const PROFILE_FORM_ID = 'profile-form';

const getDefaultValues = (user: UserProfile | undefined): ProfileFormValues => ({
    avatarUrl: user?.avatarUrl || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    accountName: user?.accountName || user?.firstName || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
});

export const ProfileForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(selectorUserData);
    const [statusMessage, setStatusMessage] = useState('');
    const [getUsersByEmail, {isFetching: isEmailChecking}] = useLazyGetUsersByEmailQuery();
    const [updateUserProfile, {
        isLoading: isProfileUpdating,
        error: profileUpdateError
    }] = useUpdateUserProfileMutation();
    const [deleteUser, {isLoading: isDeleting, error: profileDeleteError}] = useDeleteUserMutation();
    const {
        control,
        handleSubmit,
        reset,
        setError,
        clearErrors,
        setValue,
        formState: {errors}
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: getDefaultValues(user),
    });

    useEffect(() => {
        reset(getDefaultValues(user));
    }, [reset, user]);

    const avatarUrl = useWatch({control, name: 'avatarUrl'});
    const email = useWatch({control, name: 'email'});
    const isEmailConfirmationVisible = user?.emailVerified === false || email !== user?.email;
    const isFormLoading = isProfileUpdating || isEmailChecking;
    const requestErrorMessage = profileUpdateError || profileDeleteError
        ? 'Не удалось выполнить запрос. Проверьте, что сервер запущен'
        : '';
    const formErrorMessage = errors.root?.message || requestErrorMessage;

    const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith('image/')) {
            setError('avatarUrl', {
                message: 'Загрузите изображение',
            });
            return;
        }

        const reader = new FileReader();

        reader.addEventListener('load', () => {
            if (typeof reader.result !== 'string') {
                return;
            }

            setValue('avatarUrl', reader.result, {shouldDirty: true});
            clearErrors('avatarUrl');
        });

        reader.readAsDataURL(file);
        event.target.value = '';
    };

    const handleSendEmailConfirmation = () => {
        setStatusMessage('Ссылка подтверждения отправлена на email');
    };

    const handleProfileUpdate = async (values: ProfileFormValues) => {
        if (!user) {
            setError('root', {
                message: 'Данные пользователя не найдены',
            });
            return;
        }

        setStatusMessage('');

        const isEmailChanged = values.email !== user.email;
        const isPasswordChanged = Boolean(values.currentPassword || values.newPassword || values.confirmPassword);

        try {
            if (isEmailChanged) {
                const users = await getUsersByEmail(values.email).unwrap();
                const isEmailUsed = users.some(({id}) => id !== user.id);

                if (isEmailUsed) {
                    setError('email', {
                        message: 'Пользователь с таким email уже существует',
                    });
                    return;
                }
            }

            if (isPasswordChanged && values.currentPassword !== user.password) {
                setError('currentPassword', {
                    message: 'Существующий пароль указан неверно',
                });
                return;
            }

            const name = `${values.firstName} ${values.lastName}`.trim();
            const updatedUser = await updateUserProfile({
                id: user.id,
                avatarUrl: values.avatarUrl,
                firstName: values.firstName,
                lastName: values.lastName,
                accountName: values.accountName,
                email: values.email,
                emailVerified: isEmailChanged ? false : user.emailVerified,
                name,
                ...(isPasswordChanged ? {password: values.newPassword} : {}),
            }).unwrap();

            dispatch(setUserProfileData(updatedUser));
            reset(getDefaultValues(updatedUser));
            setStatusMessage('Изменения сохранены');
        } catch {
            setError('root', {
                message: 'Не удалось сохранить изменения. Попробуйте ещё раз',
            });
        }
    };

    const handleDeleteProfile = async () => {
        if (!user) {
            return;
        }

        const isConfirmed = window.confirm('Удалить аккаунт? Это действие нельзя отменить.');

        if (!isConfirmed) {
            return;
        }

        setStatusMessage('');

        try {
            await deleteUser(user.id).unwrap();
            dispatch(clearUserProfileData());
            navigate('/auth/login', {replace: true});
        } catch {
            setError('root', {
                message: 'Не удалось удалить аккаунт. Попробуйте ещё раз',
            });
        }
    };

    if (!user) {
        return (
            <p className={Styles.profileForm__formError} role="alert">
                Данные пользователя не найдены
            </p>
        );
    }

    return (
        <Container className={Styles.profilePage__card} footer={
            <div className={Styles.profileForm__actions}>
                <Button
                    className={Styles.profileForm__submitButton}
                    form={PROFILE_FORM_ID}
                    htmlType="submit"
                    loading={isFormLoading}
                    disabled={isDeleting}
                >
                    Сохранить изменения
                </Button>

                <Button
                    className={Styles.profileForm__deleteButton}
                    view="link"
                    htmlType="button"
                    loading={isDeleting}
                    onClick={handleDeleteProfile}
                >
                    Удалить аккаунт
                </Button>
            </div>
        }>
            <form
                id={PROFILE_FORM_ID}
                className={Styles.profileForm}
                onSubmit={handleSubmit(handleProfileUpdate)}
                noValidate
            >
                <AvatarUpload
                    className={Styles.profileForm__avatarUpload}
                    src={avatarUrl}
                    alt="Аватар пользователя"
                    error={errors.avatarUrl?.message}
                    onChange={handleAvatarChange}
                />

                <div className={Styles.profileForm__grid}>
                    <Controller
                        control={control}
                        name="firstName"
                        render={({field}) => (
                            <FormTextInput
                                id="profile-first-name"
                                label="Имя"
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
                                label="Фамилия"
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
                                label="Email"
                                name={field.name}
                                value={field.value}
                                className={Styles.profileForm__field_email}
                                error={errors.email?.message}
                                isError={isEmailConfirmationVisible}
                                autoComplete="email"
                                placeholder="ivanov@yandex.ru"
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                extra={isEmailConfirmationVisible && (
                                    <div className={Styles.profileForm__emailConfirm}>
                                        <p className={Styles.profileForm__hint}>
                                            Подтвердите почту, чтобы пользоваться всеми возможностями системы
                                        </p>
                                        <Button
                                            className={Styles.profileForm__emailButton}
                                            htmlType="button"
                                            onClick={handleSendEmailConfirmation}
                                        >
                                            Отправить ссылку
                                        </Button>
                                    </div>
                                )}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="accountName"
                        render={({field}) => (
                            <FormTextInput
                                id="profile-account-name"
                                label="Имя аккаунта"
                                name={field.name}
                                value={field.value}
                                className={Styles.profileForm__field_accountName}
                                error={errors.accountName?.message}
                                autoComplete="username"
                                placeholder="Yaropolk"
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </div>

                <section className={Styles.profileForm__passwordSection} aria-labelledby="profile-password-title">
                    <h2 className={Styles.profileForm__sectionTitle} id="profile-password-title">Пароль</h2>

                    <div className={Styles.profileForm__grid}>
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

                        <span className={Styles.profileForm__gridSpacer} aria-hidden="true"/>

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

                {statusMessage && <p className={Styles.profileForm__success}>{statusMessage}</p>}
                {formErrorMessage && <p className={Styles.profileForm__formError} role="alert">{formErrorMessage}</p>}
            </form>
        </Container>
    );
};
