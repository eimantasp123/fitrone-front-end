import * as yup from "yup";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

// Login schema for login form validation
export const useLoginSchema = () => {
  const { t } = useTranslation("auth");
  return yup.object().shape({
    email: yup
      .string()
      .email(t("validation.invalidEmail"))
      .required(t("validation.requiredEmail")),
    password: yup
      .string()
      .required(t("validation.requiredPassword"))
      .min(4, t("validation.minPassword", { count: 4 })),
  });
};

// Password criteria for password validation
const passwordCriteria = {
  min: 8,
  hasLowercase: /[a-z]/,
  hasUppercase: /[A-Z]/,
  hasNumber: /\d/,
  hasSymbol: /[!@#$%^&*(),.?":{}|<>]/,
};

// Password validation schema for reset password form
// Password validation schema
export const getPasswordValidationSchema = (t: TFunction) =>
  yup
    .string()
    .required(t("validation.requiredPassword"))
    .min(
      passwordCriteria.min,
      t("validation.minPassword", { count: passwordCriteria.min }),
    )
    .matches(passwordCriteria.hasLowercase, t("validation.passwordLowercase"))
    .matches(passwordCriteria.hasUppercase, t("validation.passwordUppercase"))
    .matches(passwordCriteria.hasNumber, t("validation.passwordNumber"))
    .matches(passwordCriteria.hasSymbol, t("validation.passwordSymbol"));

// Reset password schema
export const useResetPasswordSchema = () => {
  const { t } = useTranslation("auth");
  return yup.object().shape({
    password: getPasswordValidationSchema(t),
    passwordConfirm: yup
      .string()
      .required(t("validation.requiredConfirmPassword"))
      .oneOf([yup.ref("password")], t("validation.passwordsMatch")),
  });
};
// Change password schema for change password form validation
export const useChangePasswordSchema = () => {
  const { t } = useTranslation("auth");
  return yup.object().shape({
    oldPassword: yup.string().required(t("validation.oldPasswordRequired")),
    newPassword: getPasswordValidationSchema(t),
    confirmNewPassword: yup
      .string()
      .required(t("validation.requiredConfirmNewPassword"))
      .oneOf([yup.ref("newPassword")], t("validation.passwordsMatch")),
  });
};

// Register email schema for register email form validation
export const useRegisterEmailSchema = () => {
  const { t } = useTranslation("auth");
  return yup.object().shape({
    email: yup
      .string()
      .email(t("validation.invalidEmail"))
      .required(t("validation.requiredEmail"))
      .max(50, t("validation.maxEmail", { count: 50 })),
  });
};

// Register schema
export const useRegisterSchema = () => {
  const { t } = useTranslation("auth");
  return yup.object().shape({
    firstName: yup
      .string()
      .required(t("validation.firstNameRequired"))
      .min(3, t("validation.minFirstName", { count: 3 })),
    lastName: yup.string(),
    password: getPasswordValidationSchema(t),
    passwordConfirm: yup
      .string()
      .required(t("validation.requiredConfirmPassword"))
      .oneOf([yup.ref("password")], t("validation.passwordsMatch")),
  });
};

// Phone number regex for phone number validation
const phoneRegex = /^\+\d{1,3}\d{4,14}$/;

// Edit profile schema for edit profile form validation
export const useEditProfileSchema = () => {
  const { t } = useTranslation("profileSettings");

  return yup.object().shape({
    firstName: yup
      .string()
      .required(t("validation.firstNameRequired"))
      .min(3, t("validation.firstNameMin")),
    lastName: yup.string().max(50, t("validation.lastNameMax")),
    phone: yup.string().matches(phoneRegex, {
      message: t("validation.invalidPhoneNumber"),
      excludeEmptyString: true,
    }),
  });
};

// Edit email schema for edit email form validation
export const useEditPhoneNumberSchema = () => {
  const { t } = useTranslation("profileSettings");
  return yup.object().shape({
    phone: yup.string().matches(phoneRegex, {
      message: t("validation.invalidPhoneNumber"),
      excludeEmptyString: false,
    }),
  });
};

// Edit email schema for edit email form validation
export const useDeleteProfileSchema = () => {
  const { t } = useTranslation("profileSettings");
  return yup.object().shape({
    verificationInput: yup
      .string()
      .required(t("validation.verificationCodeRequired"))
      .oneOf(["DELETE"], t("validation.invalidVerificationCode")),
    secondVerificationInput: yup
      .string()
      .oneOf([yup.ref("verificationInput")], t("validation.bothMustMatch"))
      .required(t("validation.verificationCodeRequired")),
  });
};

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
