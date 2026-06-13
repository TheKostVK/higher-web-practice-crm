import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector, type TypedUseSelectorHook} from 'react-redux';
import {userSlice} from '../../entities/user';
import {taskSlice} from '../../entities/task';
import {reportsSlice} from '../../entities/reports';
import {dealSlice} from '../../entities/deal';
import {dashboardSlice} from '../../entities/dashboard';
import {clientSlice} from '../../entities/client';
import {clientApi} from '../../entities/client';
import {dashboardApi} from '../../entities/dashboard';
import {dealApi} from '../../entities/deal';
import {reportsApi} from '../../entities/reports';
import {taskApi} from '../../entities/task';
import {userApi} from '../../entities/user';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    task: taskSlice.reducer,
    reports: reportsSlice.reducer,
    deal: dealSlice.reducer,
    dashboard: dashboardSlice.reducer,
    client: clientSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
    [dealApi.reducerPath]: dealApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [reportsApi.reducerPath]: reportsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      clientApi.middleware,
      dealApi.middleware,
      taskApi.middleware,
      dashboardApi.middleware,
      reportsApi.middleware,
    ),
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
