import {createSlice} from "@reduxjs/toolkit";
import type {Task} from "../types";

type TaskSliceState = {
    isLoading: boolean,
    isError: boolean,
    errorText: string | undefined,
    tasks: Task[],
};

const initialState: TaskSliceState = {
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
    }
});

export const {
    selectorTaskIsLoading, selectorTaskIsError, selectorTaskErrorText, selectorTaskData
} = taskSlice.selectors;
