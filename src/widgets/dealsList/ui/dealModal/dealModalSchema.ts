import {z} from 'zod';

export const dealSchema = z.object({
    title: z.string().min(1, 'Обязательное поле'),
    clientId: z.string().min(1, 'Выберите клиента'),
    description: z.string().optional(),
    amount: z.number().min(0, 'Сумма не может быть отрицательной'),
    status: z.enum(['new', 'in_progress', 'completed', 'cancelled']).optional(),
});

export type TDealFormValues = z.infer<typeof dealSchema>;
