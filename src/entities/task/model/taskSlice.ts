import {createSlice} from '@reduxjs/toolkit';
import type {TTask} from '../types';

type TTaskSliceState = {
  isLoading: boolean;
  isError: boolean;
  errorText: string | undefined;
  tasks: TTask[];
};

const initialState: TTaskSliceState = {
  isLoading: false,
  isError: false,
  errorText: undefined,
  tasks: [],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  selectors: {
    selectorTaskIsLoading: (state) => state.isLoading,
    selectorTaskIsError: (state) => state.isError,
    selectorTaskErrorText: (state) => state.errorText,
    selectorTaskData: (state) => state.tasks,
  },
});

export const {selectorTaskIsLoading, selectorTaskIsError, selectorTaskErrorText, selectorTaskData} =
  taskSlice.selectors;
