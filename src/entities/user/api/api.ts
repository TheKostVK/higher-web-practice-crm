import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {
  TLoginPayload,
  TRegisterPayload,
  TUpdateProfilePayload,
  TUpdateUserAvatarPayload,
  TUser,
  TUserAvatar,
  TUserProfile,
} from '../types';
import {getApiBaseUrl} from '@/shared/api';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({baseUrl: getApiBaseUrl()}),
  tagTypes: ['TUser'],
  endpoints: (builder) => ({
    getUsers: builder.query<TUser[], void>({
      query: () => ({
        url: '/users',
      }),
      providesTags: (result) =>
        result
          ? [...result.map(({id}) => ({type: 'TUser' as const, id})), {type: 'TUser', id: 'LIST'}]
          : [{type: 'TUser', id: 'LIST'}],
    }),
    getUserById: builder.query<TUserProfile, string>({
      query: (userId: string) => ({
        url: `/users/${userId}`,
      }),
      providesTags: (_result, _error, userId) => [{type: 'TUser', id: userId}],
    }),
    getUserAvatarById: builder.query<TUserAvatar, string>({
      query: (userId: string) => ({
        url: `/users/${userId}`,
      }),
      transformResponse: (user: TUser): TUserAvatar => ({
        id: user.id,
        avatarUrl: user.avatarUrl,
      }),
      providesTags: (_result, _error, userId) => [{type: 'TUser', id: userId}],
    }),
    getUsersByEmail: builder.query<TUser[], string>({
      query: (email: string) => ({
        url: '/users',
        params: {
          email,
        },
      }),
      providesTags: (result) =>
        result
          ? [...result.map(({id}) => ({type: 'TUser' as const, id})), {type: 'TUser', id: 'LIST'}]
          : [{type: 'TUser', id: 'LIST'}],
    }),
    loginUser: builder.mutation<TUser | undefined, TLoginPayload>({
      query: (loginData: TLoginPayload) => ({
        url: '/users',
        params: loginData,
      }),
      transformResponse: (users: TUser[]) => users[0],
    }),
    registerUser: builder.mutation<TUser, TRegisterPayload>({
      query: (newUser: TRegisterPayload) => ({
        url: '/users',
        method: 'POST',
        body: {
          id: crypto.randomUUID(),
          ...newUser,
          createdAt: new Date().toISOString(),
        },
      }),
      invalidatesTags: [{type: 'TUser', id: 'LIST'}],
    }),
    updateUserProfile: builder.mutation<TUserProfile, TUpdateProfilePayload>({
      query: ({id, ...profileData}: TUpdateProfilePayload) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: profileData,
      }),
      invalidatesTags: (_result, _error, {id}) => [
        {type: 'TUser', id},
        {type: 'TUser', id: 'LIST'},
      ],
    }),
    updateUserAvatarById: builder.mutation<TUserAvatar, TUpdateUserAvatarPayload>({
      query: ({id, avatarUrl}: TUpdateUserAvatarPayload) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: {avatarUrl},
      }),
      transformResponse: (user: TUser): TUserAvatar => ({
        id: user.id,
        avatarUrl: user.avatarUrl,
      }),
      invalidatesTags: (_result, _error, {id}) => [
        {type: 'TUser', id},
        {type: 'TUser', id: 'LIST'},
      ],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (userId: string) => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, userId) => [
        {type: 'TUser', id: userId},
        {type: 'TUser', id: 'LIST'},
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetUserAvatarByIdQuery,
  useLazyGetUsersByEmailQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
  useUpdateUserProfileMutation,
  useUpdateUserAvatarByIdMutation,
  useDeleteUserMutation,
} = userApi;
