import styles from "./homePage.module.css";
import stylesContainer from "../../components/layout.module.css";
import { Link } from "react-router-dom";
import sprite from "../../images/sprite.svg";
import { FC } from "react";

const HomePage: FC = () => {
  return (
    <div className={styles.homePageSection}>
      <div className={stylesContainer.container}>
        <h1 className={styles.titleHome}>My Chat</h1>
        <ul className={styles.listLink}>
          <li>
            <Link to="/register" className={styles.link}>
              Register
            </Link>
          </li>
          <li>
            <Link to="login" className={styles.link}>
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
      </div>
    </div>
  );
};

export default HomePage;
