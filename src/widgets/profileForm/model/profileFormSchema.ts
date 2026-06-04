import {z} from 'zod';

const hasPasswordChange = (currentPassword: string, newPassword: string, confirmPassword: string) =>
    Boolean(currentPassword || newPassword || confirmPassword);

export const profileFormSchema = z
    .object({
        avatarUrl: z.string().optional(),
        firstName: z
            .string()
            .trim()
            .min(2, 'Введите имя минимум из 2 символов'),
        lastName: z
            .string()
            .trim()
            .min(2, 'Введите фамилию минимум из 2 символов'),
        email: z
            .string()
            .trim()
            .min(1, 'Введите email')
            .email('Введите корректный email'),
        accountName: z
            .string()
            .trim()
            .min(2, 'Введите имя аккаунта минимум из 2 символов'),
        currentPassword: z.string(),
        newPassword: z.string(),
        confirmPassword: z.string(),
    })
    .superRefine((values, context) => {
        if (!hasPasswordChange(values.currentPassword, values.newPassword, values.confirmPassword)) {
            return;
        }

        if (!values.currentPassword) {
            context.addIssue({
                code: 'custom',
                message: 'Введите существующий пароль',
                path: ['currentPassword'],
            });
        }

        if (values.newPassword.length < 6) {
            context.addIssue({
                code: 'custom',
                message: 'Новый пароль должен быть минимум 6 символов',
                path: ['newPassword'],
            });
        }

        if (!values.confirmPassword) {
            context.addIssue({
                code: 'custom',
                message: 'Повторите новый пароль',
                path: ['confirmPassword'],
            });
        }

        if (values.newPassword && values.confirmPassword && values.newPassword !== values.confirmPassword) {
            context.addIssue({
                code: 'custom',
                message: 'Пароли не совпадают',
                path: ['confirmPassword'],
            });
        }
    });

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
