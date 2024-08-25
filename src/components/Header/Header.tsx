import { FC } from "react";
import styles from "./header.module.css";
import stylesContainer from "../layout.module.css";
import { UserMenu } from "../UserMenu/UserMenu";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { logout } from "../../redux/api";

export const Header: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <header className={styles.header}>
      <div className={stylesContainer.container}>
        <div className={styles.useContainer}>
          <UserMenu />
          <button
            className={styles.btnLogout}
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};
