import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import {LoginPage} from './LoginPage';

const userApiMock = vi.hoisted(() => ({
    loginUser: vi.fn(),
    dispatch: vi.fn(),
}));

vi.mock('@/app', () => ({
    useAppDispatch: () => userApiMock.dispatch,
}));

vi.mock('@/entities/user', () => ({
    useLoginUserMutation: () => [userApiMock.loginUser, {isLoading: false}],
    setUserProfileData: (payload: unknown) => ({type: 'user/setUserProfileData', payload}),
}));

const renderLoginPage = (initialEntry = '/auth/login') =>
    render(
        <MemoryRouter initialEntries={[initialEntry]}>
            <Routes>
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/forgot-password" element={<h1>Восстановление пароля</h1>} />
                <Route path="/" element={<h1>Главная</h1>} />
                <Route path="/clients" element={<h1>Клиенты</h1>} />
            </Routes>
        </MemoryRouter>,
    );

describe('LoginPage', () => {
    beforeEach(() => {
        userApiMock.loginUser.mockReset();
        userApiMock.dispatch.mockReset();
    });

    it('показывает ошибки обязательных полей при отправке пустой формы', async () => {
        const user = userEvent.setup();

        renderLoginPage();

        await user.click(screen.getByRole('button', {name: /войти/i}));

        expect(await screen.findByText('Введите email')).toBeInTheDocument();
        expect(await screen.findByText('Введите пароль')).toBeInTheDocument();
        expect(userApiMock.loginUser).not.toHaveBeenCalled();
    });

    it('показывает ошибку при неверных данных входа', async () => {
        const user = userEvent.setup();

        userApiMock.loginUser.mockReturnValue({unwrap: () => Promise.resolve(undefined)});

        renderLoginPage();

        await user.type(screen.getByLabelText(/email/i), 'manager1@crm.ru');
        await user.type(screen.getByLabelText(/пароль/i), 'wrong-password');
        await user.click(screen.getByRole('button', {name: /войти/i}));

        expect(await screen.findByText('Неверный email или пароль')).toBeInTheDocument();
        expect(userApiMock.dispatch).not.toHaveBeenCalled();
    });

    it('авторизует пользователя и переходит на страницу, с которой был выполнен переход', async () => {
        const user = userEvent.setup();
        const loggedInUser = {id: 'user-1', name: 'Менеджер'};

        userApiMock.loginUser.mockReturnValue({unwrap: () => Promise.resolve(loggedInUser)});

        render(
            <MemoryRouter initialEntries={[{pathname: '/auth/login', state: {from: {pathname: '/clients'}}}]}>
                <Routes>
                    <Route path="/auth/login" element={<LoginPage />} />
                    <Route path="/clients" element={<h1>Клиенты</h1>} />
                </Routes>
            </MemoryRouter>,
        );

        await user.type(screen.getByLabelText(/email/i), 'manager1@crm.ru');
        await user.type(screen.getByLabelText(/пароль/i), '123456');
        await user.click(screen.getByRole('button', {name: /войти/i}));

        expect(await screen.findByRole('heading', {name: /клиенты/i})).toBeInTheDocument();
        expect(userApiMock.dispatch).toHaveBeenCalledWith({
            type: 'user/setUserProfileData',
            payload: loggedInUser,
        });
    });

    it('переходит на страницу восстановления пароля по клику на "Забыли пароль?"', async () => {
        const user = userEvent.setup();

        renderLoginPage();

        await user.click(screen.getByRole('button', {name: /забыли пароль/i}));

        expect(await screen.findByRole('heading', {name: /восстановление пароля/i})).toBeInTheDocument();
    });
});
