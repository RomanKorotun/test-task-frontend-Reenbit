import { FC, useState } from "react";
import styles from "./registerPage.module.css";
import stylesContainer from "../../components/layout.module.css";
import { Register } from "../../components/Register/Register";
import { NavRegisterLogin } from "../../components/NavRegisterLogin/NavRegisterLogin";

const RegisterPage: FC = () => {
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
