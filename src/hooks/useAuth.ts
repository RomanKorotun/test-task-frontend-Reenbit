import { useSelector } from "react-redux";
import {
  avatarSelector,
  chatsSelector,
  errorSelector,
  isLoggedInSelector,
  isRefreshingSelector,
  loadingSelector,
  usernameSelector,
} from "../redux/auth/selectors";

export const useAuth = () => {
  const username = useSelector(usernameSelector);
  const avatar = useSelector(avatarSelector);
  const isLoggedIn = useSelector(isLoggedInSelector);
  const isRefreshing = useSelector(isRefreshingSelector);
  const loading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);
  const chats = useSelector(chatsSelector);

  return {
    username,
    avatar,
    isLoggedIn,
    isRefreshing,
    loading,
    error,
    chats,
  };
};
