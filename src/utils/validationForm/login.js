import * as Yup from "yup";
import { emailRegexp } from "./regax";

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .matches(emailRegexp, "Email is not valid"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters long"),
});

export default loginValidationSchema;
