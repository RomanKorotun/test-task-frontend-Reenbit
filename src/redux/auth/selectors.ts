import { RootState } from "../store";
export const usernameSelector = (state: RootState) => state.auth.username;
export const avatarSelector = (state: RootState) => state.auth.avatar;
export const isLoggedInSelector = (state: RootState) => state.auth.isLoggedIn;
export const isRefreshingSelector = (state: RootState) =>
  state.auth.isRefreshing;
export const loadingSelector = (state: RootState) => state.auth.loading;
export const errorSelector = (state: RootState) => state.auth.error;
export const chatsSelector = (state: RootState) => state.auth.chats;
