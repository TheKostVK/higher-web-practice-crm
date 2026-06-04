import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {LoginPayload, RegisterPayload, UpdateProfilePayload, User, UserProfile} from "../types";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUserById: builder.query<UserProfile, string>({
            query: (userId: string) => ({
                url: `/users/${userId}`,
            }),
            providesTags: (_result, _error, userId) => [{type: 'User', id: userId}],
        }),
        getUsersByEmail: builder.query<User[], string>({
            query: (email: string) => ({
                url: '/users',
                params: {
                    email
                }
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({id}) => ({type: 'User' as const, id})),
                        {type: 'User', id: 'LIST'},
                    ]
                    : [{type: 'User', id: 'LIST'}],
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
            }),
            invalidatesTags: [{type: 'User', id: 'LIST'}],
        }),
        updateUserProfile: builder.mutation<UserProfile, UpdateProfilePayload>({
            query: ({id, ...profileData}: UpdateProfilePayload) => ({
                url: `/users/${id}`,
                method: 'PATCH',
                body: profileData,
            }),
            invalidatesTags: (_result, _error, {id}) => [
                {type: 'User', id},
                {type: 'User', id: 'LIST'},
            ],
        }),
        deleteUser: builder.mutation<void, string>({
            query: (userId: string) => ({
                url: `/users/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, userId) => [
                {type: 'User', id: userId},
                {type: 'User', id: 'LIST'},
            ],
        }),
    })
});

export const {
    useGetUserByIdQuery,
    useLazyGetUsersByEmailQuery,
    useLoginUserMutation,
    useRegisterUserMutation,
    useUpdateUserProfileMutation,
    useDeleteUserMutation,
} = userApi;
