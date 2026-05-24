import {z} from 'zod';

export const registrationSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(2, 'Введите имя минимум из 2 символов'),
        email: z
            .string()
            .trim()
            .min(1, 'Введите email')
            .email('Введите корректный email'),
        password: z
            .string()
            .min(6, 'Пароль должен быть минимум 6 символов'),
        confirmPassword: z
            .string()
            .min(1, 'Повторите пароль'),
    })
    .refine((values) => values.password === values.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
    });

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
