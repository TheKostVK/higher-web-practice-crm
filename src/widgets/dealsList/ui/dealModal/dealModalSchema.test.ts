import {describe, expect, it} from 'vitest';

import {dealSchema} from './dealModalSchema';

describe('dealSchema', () => {
    it('принимает корректные данные сделки', () => {
        const result = dealSchema.safeParse({
            title: 'Продление лицензии',
            clientId: 'client-1',
            description: 'Годовой контракт',
            amount: 120000,
            status: 'in_progress',
        });

        expect(result.success).toBe(true);
    });

    it('отклоняет пустое название, пустого клиента и отрицательную сумму', () => {
        const result = dealSchema.safeParse({
            title: '',
            clientId: '',
            description: '',
            amount: -1,
            status: 'new',
        });

        expect(result.success).toBe(false);

        if (!result.success) {
            expect(result.error.flatten().fieldErrors).toMatchObject({
                title: ['Обязательное поле'],
                clientId: ['Выберите клиента'],
                amount: ['Сумма не может быть отрицательной'],
            });
        }
    });
});
