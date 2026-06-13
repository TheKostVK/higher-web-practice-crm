import {describe, expect, it} from 'vitest';

import {clientSchema} from './clientModalSchema';

describe('clientSchema', () => {
  it('принимает корректные данные клиента', () => {
    const result = clientSchema.safeParse({
      name: 'Иван Иванов',
      phone: '+7 900 000-00-00',
      email: 'ivan@example.com',
      company: 'ООО Пример',
      website: 'example.com',
      comment: 'Постоянный клиент',
    });

    expect(result.success).toBe(true);
  });

  it('отклоняет клиента без обязательных полей и с некорректным email', () => {
    const result = clientSchema.safeParse({
      name: '',
      phone: '',
      email: 'invalid-email',
      company: '',
      website: '',
      comment: '',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors).toMatchObject({
        name: ['Обязательное поле'],
        phone: ['Обязательное поле'],
        email: ['Введите корректный email'],
        company: ['Обязательное поле'],
      });
    }
  });
});
