import {createSlice} from "@reduxjs/toolkit";
import type {Deal} from "../types";


type TDealState = {
    isLoading: boolean,
    isError: boolean,
    errorText: string | undefined,
    deals: Deal[],
};

const initialState: TDealState = {
    isLoading: false,
    isError: false,
    errorText: undefined,
    deals: [],
};

export const dealSlice = createSlice({
    name: 'deal',
    initialState,
    reducers: {},
    selectors: {
        selectorDealIsLoading: (state) => state.isLoading,
        selectorDealIsError: (state) => state.isError,
        selectorDealErrorText: (state) => state.errorText,
        selectorDealData: (state) => state.deals,
    }
});

export const {
    selectorDealIsLoading, selectorDealIsError, selectorDealErrorText, selectorDealData
} = dealSlice.selectors;
