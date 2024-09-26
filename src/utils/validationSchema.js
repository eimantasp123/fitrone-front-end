import * as yup from "yup";

// Login schema for login form validation
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters long"),
});

// Forgot password schema for forgot password form validation
export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

// Password criteria for password validation
const passwordCriteria = {
  min: 8,
  hasLowercase: /[a-z]/,
  hasUppercase: /[A-Z]/,
  hasNumber: /\d/,
  hasSymbol: /[!@#$%^&*(),.?":{}|<>]/,
};

// Password validation schema for reset password form
const passwordValidation = yup
  .string()
  .required("Password is required")
  .min(
    passwordCriteria.min,
    `Password must be at least ${passwordCriteria.min} characters long`,
  )
  .matches(
    passwordCriteria.hasLowercase,
    "Password must contain at least one lowercase letter",
  )
  .matches(
    passwordCriteria.hasUppercase,
    "Password must contain at least one uppercase letter",
  )
  .matches(
    passwordCriteria.hasNumber,
    "Password must contain at least one number",
  )
  .matches(
    passwordCriteria.hasSymbol,
    "Password must contain at least one special character",
  );

// Reset password schema for reset password form validation
export const resetPasswordSchema = yup.object().shape({
  password: passwordValidation,
  passwordConfirm: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

// Change password schema for change password form validation
export const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required("Old Password is required"),
  newPassword: passwordValidation,
  confirmNewPassword: yup
    .string()
    .required("Confirm New Password is required")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

// Register email schema for register email form validation
export const registerEmailSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .max(50, "Email must be at most 50 characters long"),
});

// Register schema for register form validation
export const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First Name is required")
    .min(3, "First Name must be at least 3 characters long"),
  lastName: yup.string(),
  password: passwordValidation,
  passwordConfirm: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

// Phone number regex for phone number validation
const phoneRegex = /^\+\d{1,3}\d{4,14}$/;

// Edit profile schema for edit profile form validation
export const editProfileSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First Name is required")
    .min(3, "First Name must be at least 3 characters long"),
  lastName: yup
    .string()
    .max(50, "Last Name must be at most 50 characters long"),
  phone: yup.string().matches(phoneRegex, {
    message:
      "Phone number must start with +, followed by country code and digits.",
    excludeEmptyString: true,
  }),
});

// Edit email schema for edit email form validation
export const editPhoneNumberSchema = yup.object().shape({
  phone: yup.string().matches(phoneRegex, {
    message:
      "Phone number must start with +, followed by country code and digits.",
    excludeEmptyString: false,
  }),
});

// Edit email schema for edit email form validation
export const deleteProfileSchema = yup.object().shape({
  verificationInput: yup
    .string()
    .required("Verification is required")
    .oneOf(["DELETE"], "Invalid verification"),
  secondVerificationInput: yup
    .string()
    .oneOf([yup.ref("verificationInput")], "Both inputs must match")
    .required("Verification is required"),
});

// Feedback schema for feedback form validation
export const feedbackSchema = yup.object().shape({
  rating: yup.number().required("Rating is required"),
  comment: yup
    .string()
    .required("Comment is required")
    .max(400, "Comment must be at most 500 characters long"),
});

export const supportSchema = yup.object().shape({
  subject: yup
    .string()
    .required("Subject is required")
    .max(200, "Subject must be at most 50 characters long"),
  message: yup
    .string()
    .required("Message is required")
    .max(500, "Message must be at most 500 characters long"),
});
