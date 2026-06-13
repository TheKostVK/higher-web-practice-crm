import {z} from 'zod';

export const registrationSchema = z
  .object({
    firstName: z.string().trim().min(2, 'Введите имя минимум из 2 символов'),
    lastName: z.string().trim().min(2, 'Введите фамилию минимум из 2 символов'),
    email: z.string().trim().min(1, 'Введите email').email('Введите корректный email'),
    accountName: z.string().trim().min(2, 'Введите имя аккаунта минимум из 2 символов'),
    password: z.string().min(6, 'Пароль должен быть минимум 6 символов'),
    confirmPassword: z.string().min(1, 'Повторите пароль'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type TRegistrationFormValues = z.infer<typeof registrationSchema>;
