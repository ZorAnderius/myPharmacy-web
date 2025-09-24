import { FastField, Form, Formik } from "formik";
import Input from "../Input/Input";
import AuthBtnGroup from "../../../group/AuthBtnGroup/AuthBtnGroup";
import styles from "./LoginForm.module.css";
import loginValidationSchema from "../../../../utils/validationForm/login";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../../../redux/auth/operations";
import { sanitizeInput } from "../../../../utils/security/sanitizeInput";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const userData = {
      email: sanitizeInput(values.email),
      password: sanitizeInput(values.password),
    };
    await dispatch(loginThunk(userData)).unwrap();
    navigate(ROUTES.SHOP);
  };

  return (
    <div className={styles.loginFormContainer}>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
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
