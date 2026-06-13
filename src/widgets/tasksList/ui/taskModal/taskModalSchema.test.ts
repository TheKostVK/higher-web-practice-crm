import {describe, expect, it} from 'vitest';

import {taskSchema} from './taskModalSchema';

describe('taskSchema', () => {
  it('принимает корректные данные задачи', () => {
    const result = taskSchema.safeParse({
      title: 'Подготовить КП',
      dealId: 'deal-1',
      description: 'Согласовать условия',
      assigneeId: 'user-1',
      dueDate: '2026-01-15T12:00:00.000Z',
      status: 'new',
    });

    expect(result.success).toBe(true);
  });

  it('отклоняет задачу без названия и исполнителя', () => {
    const result = taskSchema.safeParse({
      title: '',
      dealId: '',
      description: '',
      assigneeId: '',
      dueDate: '',
      status: 'in_progress',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors).toMatchObject({
        title: ['Обязательное поле'],
        assigneeId: ['Выберите исполнителя'],
      });
    }
  });
});
