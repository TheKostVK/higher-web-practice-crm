import {describe, expect, it} from 'vitest';

import {getClientActivityCards, getNewClientCards, getOverdueTaskCards} from './index';

describe('report card helpers', () => {
    it('собирает карточки активности клиентов', () => {
        expect(
            getClientActivityCards([
                {
                    clientId: 'client-7',
                    clientName: 'Иван Иванов',
                    dealsCount: 3,
                    completedTasks: 12,
                },
            ]),
        ).toEqual([
            {
                id: 'client-7',
                title: 'Иван Иванов',
                meta: 'id client-7',
                fields: [
                    {label: 'Сделок', value: 3},
                    {label: 'Задач завершено', value: 12},
                ],
            },
        ]);
    });

    it('собирает карточки новых клиентов с отформатированной датой', () => {
        expect(
            getNewClientCards([
                {
                    clientId: 'client-8',
                    clientName: 'Анна Петрова',
                    company: 'ООО Пример',
                    createdAt: '2026-01-15T12:00:00.000Z',
                },
            ]),
        ).toEqual([
            {
                id: 'client-8',
                title: 'Анна Петрова',
                meta: 'id client-8',
                fields: [
                    {label: 'Компания', value: 'ООО Пример'},
                    {label: 'Дата', value: '15 янв. 2026 г.'},
                ],
            },
        ]);
    });

    it('помечает карточки просроченных задач опасным тоном', () => {
        expect(
            getOverdueTaskCards([
                {
                    taskId: 'task-9',
                    title: 'Позвонить клиенту',
                    assigneeName: 'Менеджер',
                    dueDate: '2026-02-20T12:00:00.000Z',
                    status: 'in_progress',
                },
            ]),
        ).toEqual([
            {
                id: 'task-9',
                title: 'Позвонить клиенту',
                meta: 'id task-9',
                status: 'Просрочена',
                tone: 'danger',
                fields: [
                    {label: 'Ответственный', value: 'Менеджер'},
                    {label: undefined, value: '20 февр. 2026 г.'},
                ],
            },
        ]);
    });
});
