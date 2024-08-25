import { FC, useState } from "react";
import { NavRegisterLogin } from "../../components/NavRegisterLogin/NavRegisterLogin";
import styles from "./loginPage.module.css";
import stylesContainer from "../../components/layout.module.css";
import { Login } from "../../components/Login/Login";

const LoginPage: FC = () => {
  const [activeLogin] = useState<boolean>(true);
  return (
    <div className={styles.registerPageSection}>
      <div className={stylesContainer.container}>
        <div className={styles.registerPageWrapper}>
          <NavRegisterLogin isActiveLogin={activeLogin} />
          <Login />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
