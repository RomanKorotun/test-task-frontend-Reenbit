import { Route, Routes } from "react-router-dom";
import { FC, lazy, Suspense, useEffect } from "react";
import { RestrictedRoute } from "./RestrictedRoute";
import { PrivateRoute } from "./PrivateRoute";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { current } from "../redux/api";
import { useAuth } from "../hooks/useAuth";

const HomePage = lazy(() => import("../page/HomePage/HomePage"));
const RegisterPage = lazy(() => import("../page/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("../page/LoginPage/LoginPage"));
const ChatsPage = lazy(() => import("../page/ChatsPage/ChatPage"));

export const App: FC = () => {
  const dispath = useDispatch<AppDispatch>();
  const { isRefreshing } = useAuth();
  useEffect(() => {
    dispath(current());
  }, [dispath]);
  return (
    <>
      {isRefreshing ? (
        <div>Refresh user...</div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <RestrictedRoute
                redirect="/chats"
                page={
                  <Suspense>
                    <HomePage />
                  </Suspense>
                }
              />
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirect="/chats"
                page={
                  <Suspense>
                    <RegisterPage />
                  </Suspense>
                }
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                redirect="/chats"
                page={
                  <Suspense>
                    <LoginPage />
                  </Suspense>
                }
              />
            }
          />
          <Route
            path="/chats"
            element={
              <PrivateRoute
                redirect="/login"
                page={
                  <Suspense>
                    <ChatsPage />
                  </Suspense>
                }
              />
            }
          />
        </Routes>
      )}
    </>
  );
};
