import { FastField, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import Input from "../Input/Input";
import AuthBtnGroup from "../../../group/AuthBtnGroup/AuthBtnGroup";
import styles from "./RegisterForm.module.css";
import registerValidationSchema from "../../../../utils/validationForm/register";
import { registerThunk } from "../../../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    const { firstName, lastName, email, phoneNumber, password } = values;
    const userData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    };
    dispatch(registerThunk(userData));
    navigate(ROUTES.SHOP);
  };

  return (
    <div className={styles.registerFormContainer}>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={registerValidationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className={styles.registerForm}>
              <FastField name="firstName">
                {({ field, meta }) => (
                  <Input
                    id="first_name"
                    label="First Name"
                    field={field}
                    meta={meta}
                  />
                )}
              </FastField>
              <FastField name="lastName">
                {({ field, meta }) => (
                  <Input
                    id="last_name"
                    label="Last Name"
                    field={field}
                    meta={meta}
                  />
                )}
              </FastField>
              <FastField name="email">
                {({ field, meta }) => (
                  <Input
                    id="email"
                    label="Email"
                    type="email"
                    field={field}
                    meta={meta}
                  />
                )}
              </FastField>
              <FastField name="phoneNumber">
                {({ field, meta }) => (
                  <Input
                    id="phone"
                    label="Phone"
                    type="tel"
                    field={field}
                    meta={meta}
                  />
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
              <FastField name="confirmPassword">
                {({ field, meta }) => (
                  <Input
                    id="confirm_password"
                    label="Confirm Password"
                    type="password"
                    field={field}
                    meta={meta}
                  />
                )}
              </FastField>
              <AuthBtnGroup authType="register" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
