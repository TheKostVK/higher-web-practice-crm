import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {LoginPayload, RegisterPayload, User} from "../types";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    endpoints: (builder) => ({
        getUserById: builder.query<User, string>({
            query: (userId: string) => ({
                url: `/users/${userId}`,
            }),
        }),
        getUsersByEmail: builder.query<User[], string>({
            query: (email: string) => ({
                url: '/users',
                params: {
                    email
                }
            }),
        }),
        loginUser: builder.mutation<User | undefined, LoginPayload>({
            query: (loginData: LoginPayload) => ({
                url: '/users',
                params: loginData
            }),
            transformResponse: (users: User[]) => users[0],
        }),
        registerUser: builder.mutation<User, RegisterPayload>({
            query: (newUser: RegisterPayload) => ({
                url: '/users',
                method: 'POST',
                body: {
                    id: crypto.randomUUID(),
                    ...newUser,
                    createdAt: new Date().toISOString(),
                }
            })
        })
    })
});

export const {
    useGetUserByIdQuery,
    useLazyGetUsersByEmailQuery,
    useLoginUserMutation,
    useRegisterUserMutation,
} = userApi;
