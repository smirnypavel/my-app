export interface IUserAuth {
  _id: string;
  email: string;
  phone?: string;
  location?: string;
  avatarURL: string;
  role: string;
  isOnline?: boolean;
  postsId?: string[];
  token: string;
  createdAt: string;
  updatedAt?: string;
  firstName?: string;
  lastName?: string;
  ban?: boolean;
}

export interface IAuthState {
  user: IUserAuth;
  isLoggedIn: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | any;
}
