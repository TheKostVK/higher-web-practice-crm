import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import {DealModal} from './DealModal';

const dealApiMock = vi.hoisted(() => ({
  createDeal: vi.fn(),
  updateDeal: vi.fn(),
  isCreating: false,
  isUpdating: false,
  isCreateError: false,
  isUpdateError: false,
}));

vi.mock('@/app', () => ({
  useAppSelector: () => ({
    id: 'user-1',
    name: 'Менеджер',
  }),
}));

vi.mock('@/entities/client', () => ({
  useGetClientsQuery: () => ({
    data: [{id: 'client-1', name: 'ООО Ромашка'}],
    isFetching: false,
    isError: false,
  }),
}));

vi.mock('@/entities/deal', () => ({
  useCreateDealMutation: () => [
    dealApiMock.createDeal,
    {isLoading: dealApiMock.isCreating, isError: dealApiMock.isCreateError},
  ],
  useUpdateDealMutation: () => [
    dealApiMock.updateDeal,
    {isLoading: dealApiMock.isUpdating, isError: dealApiMock.isUpdateError},
  ],
}));

describe('DealModal', () => {
  beforeEach(() => {
    dealApiMock.createDeal.mockReset();
    dealApiMock.updateDeal.mockReset();
    dealApiMock.isCreating = false;
    dealApiMock.isUpdating = false;
    dealApiMock.isCreateError = false;
    dealApiMock.isUpdateError = false;
  });

  it('показывает ошибки обязательных полей при отправке пустой формы', async () => {
    const user = userEvent.setup();

    render(<DealModal open onClose={vi.fn()} />);

    expect(screen.getByLabelText(/название/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox', {name: /клиент/i})).toBeInTheDocument();
    expect(screen.getByLabelText(/сумма/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', {name: /создать/i}));

    expect(await screen.findByText('Обязательное поле')).toBeInTheDocument();
    expect(await screen.findByText('Выберите клиента')).toBeInTheDocument();
    expect(dealApiMock.createDeal).not.toHaveBeenCalled();
  });

  it('блокирует кнопку отправки во время сохранения', () => {
    dealApiMock.isCreating = true;

    render(<DealModal open onClose={vi.fn()} />);

    expect(screen.getByRole('button', {name: /создать/i})).toHaveClass('ant-btn-loading');
  });
});
