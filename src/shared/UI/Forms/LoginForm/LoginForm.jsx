import { FastField, Form, Formik } from "formik";
import Input from "../Input/Input";
import AuthBtnGroup from "../../../group/AuthBtnGroup/AuthBtnGroup";
import styles from "./LoginForm.module.css";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className={styles.loginFormContainer}>
      <div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {() => (
            <Form className={styles.loginForm}>
              <FastField name="email">
                {({ field, meta }) => (
                  <Input id="email" label="Email" field={field} meta={meta} />
                )}
              </FastField>
              <FastField name="password">
                {({ field, meta }) => (
                  <Input
                    id="password"
                    label="Password"
                    type="password"
                    field={field}
                    meta={meta}
                  />
                )}
              </FastField>
              <AuthBtnGroup authType="login" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
