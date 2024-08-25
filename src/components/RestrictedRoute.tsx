import { FC } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

interface IRestrictedRouteProps {
  redirect: string;
  page: React.ReactElement;
}

export const RestrictedRoute: FC<IRestrictedRouteProps> = ({
  redirect,
  page,
}) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to={redirect} /> : page;
};
