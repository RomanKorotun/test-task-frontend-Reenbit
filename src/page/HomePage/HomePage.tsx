import styles from "./homePage.module.css";
import stylesContainer from "../../components/layout.module.css";
import { Link, useSearchParams } from "react-router-dom";
import sprite from "../../images/sprite.svg";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { registerGoogle } from "../../redux/api";

const HomePage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token !== null) {
      dispatch(registerGoogle(token));
    }
  }, [dispatch, token]);

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
              href="http://localhost:3030/api/auth/google"
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
