import { FC } from "react";
import styles from "./userMenu.module.css";
import { useAuth } from "../../hooks/useAuth";

export const UserMenu: FC = () => {
  const { avatar, username } = useAuth();
  return (
    <div className={styles.userCard}>
      {avatar && <img src={avatar} alt="avatar" className={styles.img} />}
      <div>{username}</div>
    </div>
  );
};
