import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import {userSlice} from "../../entities/user";
import {taskSlice} from "../../entities/task";
import {reportsSlice} from "../../entities/reports";
import {dealSlice} from "../../entities/deal";
import {dashboardSlice} from "../../entities/dashboard";
import {clientSlice} from "../../entities/client";
import {userApi} from "../../entities/user";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        task: taskSlice.reducer,
        reports: reportsSlice.reducer,
        deal: dealSlice.reducer,
        dashboard: dashboardSlice.reducer,
        client: clientSlice.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
