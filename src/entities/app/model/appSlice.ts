import {createSlice} from '@reduxjs/toolkit';

type TAppState = Record<string, never>;

const initialState: TAppState = {};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {},
    selectors: {},
});
