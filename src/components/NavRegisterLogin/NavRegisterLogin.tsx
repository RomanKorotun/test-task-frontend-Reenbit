import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./navRegisterLogin.module.css";
import sprite from "../../images/sprite.svg";

interface INavRegisterLoginProps {
  isActiveRegister?: boolean;
  isActiveLogin?: boolean;
}

export const NavRegisterLogin: FC<INavRegisterLoginProps> = ({
  isActiveRegister,
  isActiveLogin,
}) => {
  return (
    <ul className={styles.listLink}>
      <li>
        <Link
          to="/register"
          className={
            isActiveRegister
              ? `${styles.link} ${styles.active}`
              : `${styles.link}`
          }
        >
          Register
        </Link>
      </li>
      <li>
        <Link
          to="/login"
          className={
            isActiveLogin ? `${styles.link} ${styles.active}` : `${styles.link}`
          }
        >
          Login
        </Link>
      </li>
      <li>
        <a
          href="https://test-task-backend-reenbit.onrender.com/api/auth/google"
          className={styles.linkGoogle}
        >
          <svg width={35} height={35}>
            <use href={`${sprite}#google-icon`}></use>
          </svg>
          Google
        </a>
      </li>
    </ul>
  );
};
