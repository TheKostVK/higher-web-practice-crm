import {type ChangeEvent, useEffect, useState} from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm, useWatch} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '@/app';
import {
    clearUserProfileData,
    logout,
    selectorUserData,
    setUserProfileData,
    useDeleteUserMutation,
    useLazyGetUsersByEmailQuery,
    useUpdateUserAvatarByIdMutation,
    useUpdateUserProfileMutation,
} from '@/entities/user';
import {readFileAsDataUrl} from '@/shared/lib/files';
import {profileFormSchema, type TProfileFormValues} from '../model';
import {getDefaultValues} from '../lib/getDefaultValues.ts';

export const useProfileForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(selectorUserData);
    const [statusMessage, setStatusMessage] = useState('');
    const [getUsersByEmail, {isFetching: isEmailChecking}] = useLazyGetUsersByEmailQuery();
    const [updateUserProfile, {
        isLoading: isProfileUpdating,
        error: profileUpdateError
    }] = useUpdateUserProfileMutation();
    const [updateUserAvatarById, {isLoading: isAvatarUpdating, error: avatarUpdateError}] =
        useUpdateUserAvatarByIdMutation();
    const [deleteUser, {isLoading: isDeleting, error: profileDeleteError}] = useDeleteUserMutation();
    const {
        control,
        handleSubmit,
        reset,
        setError,
        clearErrors,
        setValue,
        formState: {errors},
    } = useForm<TProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: getDefaultValues(user),
    });

    useEffect(() => {
        reset(getDefaultValues(user));
    }, [reset, user]);

    const avatarUrl = useWatch({control, name: 'avatarUrl'});
    const email = useWatch({control, name: 'email'});
    const isEmailConfirmationVisible = user?.emailVerified === false || email !== user?.email;
    const isFormLoading = isProfileUpdating || isAvatarUpdating || isEmailChecking;
    const requestErrorMessage =
        profileUpdateError || avatarUpdateError || profileDeleteError
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

        readFileAsDataUrl(file)
            .then((dataUrl) => {
                setValue('avatarUrl', dataUrl, {shouldDirty: true});
                clearErrors('avatarUrl');
            })
            .catch(() => {
                setError('avatarUrl', {
                    message: 'Не удалось загрузить изображение',
                });
            });

        event.target.value = '';
    };

    const handleSendEmailConfirmation = () => {
        setStatusMessage('Ссылка подтверждения отправлена на email');
    };

    const handleProfileUpdate = async (values: TProfileFormValues) => {
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
            const isAvatarChanged = values.avatarUrl !== (user.avatarUrl || '');
            const updatedUser = await updateUserProfile({
                id: user.id,
                firstName: values.firstName,
                lastName: values.lastName,
                accountName: values.accountName,
                email: values.email,
                emailVerified: isEmailChanged ? false : user.emailVerified,
                name,
                ...(isPasswordChanged ? {password: values.newPassword} : {}),
            }).unwrap();
            const nextUser = isAvatarChanged
                ? {
                    ...updatedUser,
                    ...(await updateUserAvatarById({
                        id: user.id,
                        avatarUrl: values.avatarUrl || '',
                    }).unwrap()),
                }
                : updatedUser;

            dispatch(setUserProfileData(nextUser));
            reset(getDefaultValues(nextUser));
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

    const handleLogoutProfile = async () => {
        if (!user) {
            return;
        }

        const isConfirmed = window.confirm('Выйти из аккаунта?');

        if (!isConfirmed) {
            return;
        }

        setStatusMessage('');

        try {
            dispatch(logout());
            navigate('/auth/login', {replace: true});
        } catch {
            setError('root', {
                message: 'Не удалось удалить аккаунт. Попробуйте ещё раз',
            });
        }
    };

    return {
        user,
        control,
        handleSubmit,
        errors,
        avatarUrl,
        isEmailConfirmationVisible,
        isFormLoading,
        isDeleting,
        statusMessage,
        formErrorMessage,
        handleAvatarChange,
        handleSendEmailConfirmation,
        handleProfileUpdate,
        handleDeleteProfile,
        handleLogoutProfile,
    };
};
