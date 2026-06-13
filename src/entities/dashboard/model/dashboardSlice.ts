import {createSlice} from '@reduxjs/toolkit';
import type {TDashboardData, TDashboardStats} from '../types';

type TDashboardState = {
  isLoading: boolean;
  isError: boolean;
  errorText: string | undefined;
  dashboardStats: TDashboardStats | undefined;
  dashboardData: TDashboardData | undefined;
};

const initialState: TDashboardState = {
  isLoading: false,
  isError: false,
  errorText: undefined,
  dashboardStats: undefined,
  dashboardData: undefined,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  selectors: {
    selectorDashboardIsLoading: (state) => state.isLoading,
    selectorDashboardIsError: (state) => state.isError,
    selectorDashboardErrorText: (state) => state.errorText,
    selectorDashboardStats: (state) => state.dashboardStats,
    selectorDashboardData: (state) => state.dashboardData,
  },
});

export const {
  selectorDashboardIsLoading,
  selectorDashboardIsError,
  selectorDashboardErrorText,
  selectorDashboardStats,
  selectorDashboardData,
} = dashboardSlice.selectors;
