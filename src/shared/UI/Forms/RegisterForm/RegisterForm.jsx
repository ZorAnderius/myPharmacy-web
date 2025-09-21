import { Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import styles from "./RegisterForm.module.css";

const RegisterForm = () => {
  return (
    <div className={styles.registerFormContainer}>
      <motion.div>
        <Formik>
          {() => (
            <Form className={styles.registerForm}>
              <div className={styles.formGroup}>
                <label htmlFor="first_name">First Name</label>
                <Field type="text" id="first_name" name="first_name" className={styles.formField} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="last_name">Last Name</label>
                <Field type="text" id="last_name" name="last_name" className={styles.formField} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" className={styles.formField} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone</label>
                <Field type="tel" id="phone" name="phone" className={styles.formField} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" className={styles.formField} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="confirm_password">Confirm Password</label>
                <Field
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  className={styles.formField}
                />
              </div>
              <button type="submit">Register</button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
