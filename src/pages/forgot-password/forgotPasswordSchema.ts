import {z} from 'zod';

export const forgotPasswordSchema = z.object({
    email: z.string().trim().min(1, 'Введите email').email('Введите корректный email'),
});

export type TForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
