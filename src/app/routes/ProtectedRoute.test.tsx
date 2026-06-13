import {render, screen} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import {ProtectedRoute} from './ProtectedRoute';

const routeMock = vi.hoisted(() => ({
  dispatch: vi.fn(),
  state: {
    user: {
      isInit: true,
      user: undefined as {id: string; name: string} | undefined,
    },
  },
}));

vi.mock('../redux', () => ({
  useAppDispatch: () => routeMock.dispatch,
  useAppSelector: <TSelected,>(selector: (state: typeof routeMock.state) => TSelected) => selector(routeMock.state),
}));

describe('ProtectedRoute', () => {
  beforeEach(() => {
    routeMock.dispatch.mockReset();
    routeMock.state.user.isInit = true;
    routeMock.state.user.user = undefined;
  });

  it('перенаправляет неавторизованного пользователя на страницу входа', async () => {
    render(
      <MemoryRouter initialEntries={['/clients']}>
        <Routes>
          <Route path="/auth/login" element={<h1>Вход</h1>} />
          <Route
            path="/clients"
            element={
              <ProtectedRoute>
                <h1>Клиенты</h1>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByRole('heading', {name: /вход/i})).toBeInTheDocument();
  });

  it('показывает защищённый контент авторизованному пользователю', () => {
    routeMock.state.user.user = {
      id: 'user-1',
      name: 'Менеджер',
    };

    render(
      <MemoryRouter initialEntries={['/clients']}>
        <Routes>
          <Route
            path="/clients"
            element={
              <ProtectedRoute>
                <h1>Клиенты</h1>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', {name: /клиенты/i})).toBeInTheDocument();
  });
});
