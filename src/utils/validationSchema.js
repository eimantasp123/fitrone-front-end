import * as yup from "yup";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required").min(4, "Password must be at least 4 characters long"),
});

export const verifySchema = yup.object().shape({
  code: yup.string().required("Verification code is required"),
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().matches(emailRegex, "Invalid email format").required("Email is required"),
});

const passwordCriteria = {
  min: 8,
  hasLowercase: /[a-z]/,
  hasUppercase: /[A-Z]/,
  hasNumber: /\d/,
  hasSymbol: /[!@#$%^&*(),.?":{}|<>]/,
};

const passwordValidation = yup
  .string()
  .required("Password is required")
  .min(passwordCriteria.min, `Password must be at least ${passwordCriteria.min} characters long`)
  .matches(passwordCriteria.hasLowercase, "Password must contain at least one lowercase letter")
  .matches(passwordCriteria.hasUppercase, "Password must contain at least one uppercase letter")
  .matches(passwordCriteria.hasNumber, "Password must contain at least one number")
  .matches(passwordCriteria.hasSymbol, "Password must contain at least one special character");

export const resetPasswordSchema = yup.object().shape({
  password: passwordValidation,
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format")
    .required("Email is required"),
  password: passwordValidation,
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const editProfileSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup.string().optional(),
  birthday: yup.date().optional(),
  nationality: yup.string().optional(),
  gender: yup.string().oneOf(["Male", "Female", "Other"]).optional(),
  backupEmail: yup.string().email("Invalid email").optional(),
});
