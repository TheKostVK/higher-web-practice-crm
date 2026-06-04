export type User = {
    id: string;
    email: string;
    name: string;
    firstName?: string;
    lastName?: string;
    accountName?: string;
    avatarUrl?: string;
    emailVerified?: boolean;
    createdAt: string;
    password?: string;
}

export type UserProfile = User & {
    firstName: string;
    lastName: string;
    password?: string;
}

export type RegisterPayload = {
    email: string;
    password: string;
    name: string;
}

export type LoginPayload = {
    email: string;
    password: string;
}

export type UpdateProfilePayload = {
    id: string;
    email?: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    accountName?: string;
    avatarUrl?: string;
    emailVerified?: boolean;
    password?: string;
}
