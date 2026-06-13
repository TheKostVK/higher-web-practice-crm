import {createSlice} from '@reduxjs/toolkit';
import type {TClient} from '../types';

type TClientState = {
    isLoading: boolean;
    isError: boolean;
    errorText: string | undefined;
    clients: TClient[];
};

const initialState: TClientState = {
    isLoading: false,
    isError: false,
    errorText: undefined,
    clients: [],
};

export const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {},
    selectors: {
        selectorClientIsLoading: (state) => state.isLoading,
        selectorClientIsError: (state) => state.isError,
        selectorClientErrorText: (state) => state.errorText,
        selectorClientData: (state) => state.clients,
    },
});

export const {selectorClientIsLoading, selectorClientIsError, selectorClientErrorText, selectorClientData} =
    clientSlice.selectors;
