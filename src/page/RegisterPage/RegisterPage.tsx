import { FC, useEffect, useState } from "react";
import styles from "./registerPage.module.css";
import stylesContainer from "../../components/layout.module.css";
import { Register } from "../../components/Register/Register";
import { NavRegisterLogin } from "../../components/NavRegisterLogin/NavRegisterLogin";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { registerGoogle } from "../../redux/api";

const RegisterPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token !== null) {
      dispatch(registerGoogle(token));
    }
  }, [dispatch, token]);
  const [activeRegister] = useState<boolean>(true);
  return (
    <div className={styles.registerPageSection}>
      <div className={stylesContainer.container}>
        <div className={styles.registerPageWrapper}>
          <NavRegisterLogin isActiveRegister={activeRegister} />
          <Register />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
