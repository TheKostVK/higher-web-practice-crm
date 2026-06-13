export type TUser = {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  accountName: string;
  avatarUrl: string;
  emailVerified?: boolean;
  createdAt: string;
  password?: string;
};

export type TUserAvatar = Pick<TUser, 'id' | 'avatarUrl'>;

export type TUserProfile = TUser & {
  password?: string;
};

export type TRegisterPayload = {
  email: string;
  password: string;
  name: string;
  firstName: string;
  lastName: string;
  accountName: string;
};

export type TLoginPayload = {
  email: string;
  password: string;
};

export type TUpdateProfilePayload = {
  id: string;
  email?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  accountName?: string;
  avatarUrl?: string;
  emailVerified?: boolean;
  password?: string;
};

export type TUpdateUserAvatarPayload = {
  id: string;
  avatarUrl: string;
};
