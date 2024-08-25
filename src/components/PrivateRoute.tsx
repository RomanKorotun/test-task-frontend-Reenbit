import { FC } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

interface IPrivateRouteProps {
  redirect: string;
  page: React.ReactElement;
}

export const PrivateRoute: FC<IPrivateRouteProps> = ({ redirect, page }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? page : <Navigate to={redirect} />;
};
