import {z} from 'zod';

export const confirmEmailSchema = z.object({
    confirmationLink: z.string().trim().min(1, 'Вставьте ссылку подтверждения').url('Введите корректную ссылку'),
});

export type TConfirmEmailFormValues = z.infer<typeof confirmEmailSchema>;
