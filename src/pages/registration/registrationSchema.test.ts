import {describe, expect, it} from 'vitest';

import {registrationSchema} from './registrationSchema';

const validValues = {
    firstName: 'Иван',
    lastName: 'Иванов',
    email: 'ivan@example.com',
    accountName: 'ivanov',
    password: '123456',
    confirmPassword: '123456',
};

describe('registrationSchema', () => {
    it('принимает корректные данные регистрации', () => {
        const result = registrationSchema.safeParse(validValues);

        expect(result.success).toBe(true);
    });

    it('отклоняет пароли короче 6 символов и слишком короткие имена', () => {
        const result = registrationSchema.safeParse({
            ...validValues,
            firstName: 'И',
            lastName: 'И',
            accountName: 'a',
            password: '123',
            confirmPassword: '123',
        });

        expect(result.success).toBe(false);

        if (!result.success) {
            expect(result.error.flatten().fieldErrors).toMatchObject({
                firstName: ['Введите имя минимум из 2 символов'],
                lastName: ['Введите фамилию минимум из 2 символов'],
                accountName: ['Введите имя аккаунта минимум из 2 символов'],
                password: ['Пароль должен быть минимум 6 символов'],
            });
        }
    });

    it('отклоняет несовпадающие пароли', () => {
        const result = registrationSchema.safeParse({
            ...validValues,
            confirmPassword: 'другой-пароль',
        });

        expect(result.success).toBe(false);

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;

            expect(fieldErrors.confirmPassword).toContain('Пароли не совпадают');
        }
    });

    it('отклоняет некорректный email', () => {
        const result = registrationSchema.safeParse({
            ...validValues,
            email: 'не-email',
        });

        expect(result.success).toBe(false);

        if (!result.success) {
            expect(result.error.flatten().fieldErrors.email).toContain('Введите корректный email');
        }
    });
});
