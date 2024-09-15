import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required").min(4, "Password must be at least 4 characters long"),
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
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
  passwordConfirm: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required("Old Password is required"),
  newPassword: passwordValidation,
  confirmNewPassword: yup
    .string()
    .required("Confirm New Password is required")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

export const registerEmailSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required").max(50, "Email must be at most 50 characters long"),
});

export const registerSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required").min(3, "First Name must be at least 3 characters long"),
  lastName: yup.string(),
  password: passwordValidation,
  passwordConfirm: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const phoneRegex = /^\+?[1-9]\d{6,14}$/;

export const editProfileSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required").min(3, "First Name must be at least 3 characters long"),
  lastName: yup.string(),
  phone: yup.string().matches(phoneRegex, { message: "Invalid phone number", excludeEmptyString: true }),
});

export const editPhoneNumberSchema = yup.object().shape({
  phone: yup.string().matches(phoneRegex, { message: "Invalid phone number", excludeEmptyString: false }),
});
