import {render, screen} from '@testing-library/react';
import {useForm} from 'react-hook-form';
import {describe, expect, it, vi} from 'vitest';

import type {TProfileFormValues} from '../../model';
import {ProfileFields} from './ProfileFields';

const ProfileFieldsWrapper = () => {
    const {
        control,
        formState: {errors},
    } = useForm<TProfileFormValues>({
        defaultValues: {
            avatarUrl: '',
            firstName: '',
            lastName: '',
            email: '',
            accountName: '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    return (
        <ProfileFields
            control={control}
            errors={errors}
            isEmailConfirmationVisible={false}
            onSendEmailConfirmation={vi.fn()}
        />
    );
};

describe('ProfileFields', () => {
    it('помечает обязательные поля звёздочкой в лейбле', () => {
        render(<ProfileFieldsWrapper />);

        expect(screen.getByLabelText(/имя \*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/фамилия \*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email \*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/имя аккаунта \*/i)).toBeInTheDocument();
    });
});
