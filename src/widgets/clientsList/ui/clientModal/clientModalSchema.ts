import {z} from 'zod';

export const clientSchema = z.object({
  name: z.string().min(1, 'Обязательное поле'),
  phone: z.string().min(1, 'Обязательное поле'),
  email: z.string().min(1, 'Обязательное поле').email('Введите корректный email'),
  company: z.string().min(1, 'Обязательное поле'),
  website: z.string().optional(),
  comment: z.string().optional(),
});

export type TClientFormValues = z.infer<typeof clientSchema>;
