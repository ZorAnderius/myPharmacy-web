import { FastField, Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useState } from "react";
import Input from "../Input/Input";
import AuthBtnGroup from "../../../group/AuthBtnGroup/AuthBtnGroup";
import styles from "./RegisterForm.module.css";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  password: "",
  confirm_password: "",
};

const RegisterForm = () => {
  return (
    <div className={styles.registerFormContainer}>
      <motion.div>
        <Formik initialValues={initialValues} onSubmit={() => {}}>
          {() => (
            <Form className={styles.registerForm}>
              <FastField name="first_name">
                {({ field, meta }) => (
                  <Input
                    id="first_name"
                    label="First Name"
                    field={field}
                    meta={meta}
                  />
                )}
              </FastField>
              <FastField name="last_name">
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
              <FastField name="phone">
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
              <FastField name="confirm_password">
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
      </motion.div>
    </div>
  );
};

export default RegisterForm;
