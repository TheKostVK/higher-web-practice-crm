import {AvatarUpload} from '@/shared/ui/avatarUpload';
import {LayoutContainer} from '@/shared/ui/layoutContainer';
import {FormStatusMessage} from '@/shared/ui/formStatusMessage';
import {PROFILE_FORM_ID} from './lib';
import {ProfileFields} from './ui/profileFields';
import {PasswordSection} from './ui/passwordSection';
import {FormActions} from './ui/formActions';
import Styles from './profileForm.module.css';
import {useProfileForm} from "@/widgets/profileForm/hook";

export const ProfileForm = () => {
    const {
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
    } = useProfileForm();

    if (!user) {
        return (
            <FormStatusMessage type="error" role="alert">
                Данные пользователя не найдены
            </FormStatusMessage>
        );
    }

    return (
        <LayoutContainer
            className={Styles.profilePage__card}
            footer={
                <FormActions
                    isFormLoading={isFormLoading}
                    isDeleting={isDeleting}
                    onLogout={handleLogoutProfile}
                    onDelete={handleDeleteProfile}
                />
            }
        >
            <form id={PROFILE_FORM_ID} className={Styles.profileForm} onSubmit={handleSubmit(handleProfileUpdate)}
                noValidate>
                <AvatarUpload
                    className={Styles.profileForm__avatarUpload}
                    src={avatarUrl}
                    alt="Аватар пользователя"
                    error={errors.avatarUrl?.message}
                    onChange={handleAvatarChange}
                />

                <ProfileFields
                    control={control}
                    errors={errors}
                    isEmailConfirmationVisible={isEmailConfirmationVisible}
                    onSendEmailConfirmation={handleSendEmailConfirmation}
                />

                <PasswordSection control={control} errors={errors}/>

                {statusMessage && <FormStatusMessage type="success">{statusMessage}</FormStatusMessage>}
                {formErrorMessage && (
                    <FormStatusMessage type="error" role="alert">
                        {formErrorMessage}
                    </FormStatusMessage>
                )}
            </form>
        </LayoutContainer>
    );
};
