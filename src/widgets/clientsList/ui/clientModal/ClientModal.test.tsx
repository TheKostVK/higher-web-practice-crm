import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import {ClientModal} from './ClientModal';

const clientApiMock = vi.hoisted(() => ({
    createClient: vi.fn(),
    updateClient: vi.fn(),
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
    useCreateClientMutation: () => [
        clientApiMock.createClient,
        {isLoading: clientApiMock.isCreating, isError: clientApiMock.isCreateError},
    ],
    useUpdateClientMutation: () => [
        clientApiMock.updateClient,
        {isLoading: clientApiMock.isUpdating, isError: clientApiMock.isUpdateError},
    ],
}));

describe('ClientModal', () => {
    beforeEach(() => {
        clientApiMock.createClient.mockReset();
        clientApiMock.updateClient.mockReset();
        clientApiMock.isCreating = false;
        clientApiMock.isUpdating = false;
        clientApiMock.isCreateError = false;
        clientApiMock.isUpdateError = false;
    });

    it('показывает ошибки обязательных полей при отправке пустой формы', async () => {
        const user = userEvent.setup();

        render(<ClientModal open onClose={vi.fn()} />);

        expect(screen.getByLabelText(/имя/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/телефон/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/компания/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

        await user.click(screen.getByRole('button', {name: /создать/i}));

        expect(await screen.findAllByText('Обязательное поле')).toHaveLength(4);
        expect(clientApiMock.createClient).not.toHaveBeenCalled();
    });

    it('блокирует кнопку отправки во время сохранения', () => {
        clientApiMock.isCreating = true;

        render(<ClientModal open onClose={vi.fn()} />);

        expect(screen.getByRole('button', {name: /создать/i})).toHaveClass('ant-btn-loading');
    });
});
