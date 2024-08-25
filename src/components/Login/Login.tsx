import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import { FC } from "react";
import * as Yup from "yup";
import styles from "./login.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { login } from "../../redux/api";

export interface IUserLogin {
  email: string;
  password: string;
}

const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegexp, "Invalid email")
    .required("Required"),
  password: Yup.string().required("Required"),
});

export const Login: FC = () => {
  const dispath = useDispatch<AppDispatch>();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={(values: IUserLogin, actions: FormikHelpers<IUserLogin>) => {
        dispath(login(values));
        actions.resetForm();
      }}
    >
      <Form className={styles.loginForm}>
        <label className={styles.label}>
          <Field
            name="email"
            type="email"
            placeholder="Email"
            className={styles.field}
          />
          <ErrorMessage
            component="div"
            name="email"
            className={styles.errMsg}
          />
        </label>

        <label className={styles.label}>
          <Field
            name="password"
            type="password"
            placeholder="Password"
            className={styles.field}
          />
          <ErrorMessage
            component="div"
            name="password"
            className={styles.errMsg}
          />
        </label>

        <button className={styles.btnLogin} type="submit">
          Submit
        </button>
      </Form>
    </Formik>
  );
};
