import type {TUserProfile} from '@/entities/user';
import type {TProfileFormValues} from '../model';

export const getDefaultValues = (user: TUserProfile | undefined): TProfileFormValues => ({
    avatarUrl: user?.avatarUrl || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    accountName: user?.accountName || user?.firstName || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
});
