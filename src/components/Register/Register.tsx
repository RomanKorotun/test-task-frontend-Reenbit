import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import { FC } from "react";
import * as Yup from "yup";
import styles from "./register.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { register } from "../../redux/api";

export interface IUserRegister {
  username: string;
  email: string;
  password: string;
}

const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .matches(emailRegexp, "Invalid email")
    .required("Required"),
  password: Yup.string().required("Required"),
});

export const Register: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
      }}
      validationSchema={RegisterSchema}
      onSubmit={(
        values: IUserRegister,
        actions: FormikHelpers<IUserRegister>
      ) => {
        dispatch(register(values));
        actions.resetForm();
      }}
    >
      <Form className={styles.registerForm}>
        <label className={styles.label}>
          <Field name="username" placeholder="Name" className={styles.field} />
          <ErrorMessage
            component="div"
            name="username"
            className={styles.errMsg}
          />
        </label>

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

        <button className={styles.btnRegister} type="submit">
          Submit
        </button>
      </Form>
    </Formik>
  );
};
