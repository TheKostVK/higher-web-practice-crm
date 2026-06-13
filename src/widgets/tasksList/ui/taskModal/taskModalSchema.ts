import {z} from 'zod';

export const taskSchema = z.object({
    title: z.string().min(1, 'Обязательное поле'),
    dealId: z.string().optional(),
    description: z.string().optional(),
    assigneeId: z.string().min(1, 'Выберите исполнителя'),
    dueDate: z.string().optional(),
    status: z.enum(['new', 'in_progress', 'completed']).optional(),
});

export type TTaskFormValues = z.infer<typeof taskSchema>;
