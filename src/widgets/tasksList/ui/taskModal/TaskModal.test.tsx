import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import {TaskModal} from './TaskModal';

const taskApiMock = vi.hoisted(() => ({
    createTask: vi.fn(),
    updateTask: vi.fn(),
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

vi.mock('@/entities/deal', () => ({
    useGetDealsQuery: () => ({
        data: [{id: 'deal-1', title: 'Внедрение CRM'}],
        isFetching: false,
        isError: false,
    }),
}));

vi.mock('@/entities/task', () => ({
    useCreateTaskMutation: () => [
        taskApiMock.createTask,
        {isLoading: taskApiMock.isCreating, isError: taskApiMock.isCreateError},
    ],
    useUpdateTaskMutation: () => [
        taskApiMock.updateTask,
        {isLoading: taskApiMock.isUpdating, isError: taskApiMock.isUpdateError},
    ],
}));

describe('TaskModal', () => {
    beforeEach(() => {
        taskApiMock.createTask.mockReset();
        taskApiMock.updateTask.mockReset();
        taskApiMock.isCreating = false;
        taskApiMock.isUpdating = false;
        taskApiMock.isCreateError = false;
        taskApiMock.isUpdateError = false;
    });

    it('показывает ошибки обязательных полей при отправке пустой формы', async () => {
        const user = userEvent.setup();

        render(<TaskModal open onClose={vi.fn()} />);

        expect(screen.getByLabelText(/название/i)).toBeInTheDocument();
        expect(screen.getByRole('combobox', {name: /исполнитель/i})).toBeInTheDocument();

        await user.click(screen.getByRole('button', {name: /создать/i}));

        expect(await screen.findByText('Обязательное поле')).toBeInTheDocument();
        expect(await screen.findByText('Выберите исполнителя')).toBeInTheDocument();
        expect(taskApiMock.createTask).not.toHaveBeenCalled();
    });

    it('блокирует кнопку отправки во время сохранения', () => {
        taskApiMock.isCreating = true;

        render(<TaskModal open onClose={vi.fn()} />);

        expect(screen.getByRole('button', {name: /создать/i})).toHaveClass('ant-btn-loading');
    });
});
