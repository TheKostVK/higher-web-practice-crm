import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {User, UserProfile} from "../types";
import {getUserLocalStorage, removeUserLocalStorage, setUserLocalStorage} from "../lib";

type TUserState = {
    isInit: boolean,
    user: UserProfile | undefined,
};

const initialState: TUserState = {
    isInit: false,
    user: undefined,
};

const getUserProfile = (user: User): UserProfile => {
    const [firstName = 'пользователь', ...lastNameParts] = user.name.trim().split(/\s+/);
    const lastName = lastNameParts.join(' ');

    return {
        ...user,
        firstName: user.firstName || firstName,
        lastName: user.lastName || lastName,
    };
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initUser: (state) => {
            const user = getUserLocalStorage();

            state.user = user ? getUserProfile(user) : undefined;

            state.isInit = true;
        },
        setUserProfileData: (state, action: PayloadAction<User>) => {
            state.user = getUserProfile(action.payload);

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
