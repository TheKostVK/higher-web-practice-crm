import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {UserProfile} from "../types";
import {getUserLocalStorage, removeUserLocalStorage, setUserLocalStorage} from "../lib";

type TUserState = {
    isInit: boolean,
    user: UserProfile | undefined,
};

const initialState: TUserState = {
    isInit: false,
    user: undefined,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initUser: (state) => {
            state.user = getUserLocalStorage();
            state.isInit = true;
        },
        setUserProfileData: (state, action: PayloadAction<UserProfile>) => {
            state.user = action.payload;
            setUserLocalStorage(state.user);
        },
        clearUserProfileData: (state) => {
            state.user = undefined;
            removeUserLocalStorage();
        }
    },
    selectors: {
        selectorUserIsInit: (state) => state.isInit,
        selectorUserData: (state) => state.user,
    },
});

export const {initUser, setUserProfileData, clearUserProfileData} = userSlice.actions;

export const {
    selectorUserIsInit,
    selectorUserData
} = userSlice.selectors;
