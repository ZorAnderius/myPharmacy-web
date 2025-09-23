import * as Yup from "yup";

const phoneRegExp = /^07\d{9}$/;
const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const registerValidationSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required")
    .test("maxWords", "First name must be at most 30 words", (value) => {
      if (!value) return true;
      return value.trim().split(/\s+/).length <= 30;
    }),
  lastName: Yup.string()
    .required("Last name is required")
    .test("maxWords", "Last name must be at most 30 words", (value) => {
      if (!value) return true;
      return value.trim().split(/\s+/).length <= 30;
    }),
  email: Yup.string()
    .required("Email is required")
    .matches(emailRegexp, "Email is not valid"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(phoneRegExp, "Phone number is not valid"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters long"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export default registerValidationSchema;
