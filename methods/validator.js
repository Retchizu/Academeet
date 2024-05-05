import * as Yup from "yup";

const whiteSpaceRegex = /^\S*$/;
const validationSchema = Yup.object({
  userName: Yup.string()
    .trim()
    .min(3, "Invalid name")
    .required("User name is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .trim()
    .matches(whiteSpaceRegex, "No spaces allowed")
    .min(8, "Password is too short!")
    .required("Password is required"),
  confirmPassword: Yup.string().equals(
    [Yup.ref("password"), null],
    "password does not match"
  ),
});

export { validationSchema };
