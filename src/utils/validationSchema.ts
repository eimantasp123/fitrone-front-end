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
    email: yup
      .string()
      .email(t("validation.invalidEmail"))
      .max(100, t("validation.maxEmail", { count: 100 })),
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
export const useFeedbackSchema = () => {
  const { t } = useTranslation("common");
  return yup.object().shape({
    rating: yup.number().required(t("feedbackModal.validation.required")),
    comment: yup
      .string()
      .required(t("feedbackModal.validation.commentRequired"))
      .max(500, t("feedbackModal.validation.maxLength")),
  });
};

// Support schema for support form validation
export const useSupportSchema = () => {
  const { t } = useTranslation("header");
  return yup.object().shape({
    subject: yup
      .string()
      .required(t("supportModal.validation.subject"))
      .max(200, t("supportModal.validation.subjectMax")),
    message: yup
      .string()
      .required(t("supportModal.validation.message"))
      .max(500, t("supportModal.validation.messageMax")),
  });
};

//  Ingredient input schema for ingredient input form validation
export const useIngredientInputSchema = () => {
  const { t } = useTranslation("meals");

  const requiredMessage = t("errors.fieldIsRequired");
  const numberTransform = (
    value: string | number,
    originalValue: string | number,
  ) => (originalValue === "" ? undefined : value);

  return yup.object().shape({
    title: yup.string().trim().required(requiredMessage),
    amount: yup
      .number()
      .transform(numberTransform)
      .typeError(t("errors.amountValid"))
      .required(requiredMessage),
    calories: yup
      .number()
      .transform(numberTransform)
      .typeError(t("errors.caloriesValid"))
      .required(requiredMessage),
    carbs: yup
      .number()
      .transform(numberTransform)
      .typeError(t("errors.carbsValid"))
      .required(requiredMessage),
    fat: yup
      .number()
      .transform(numberTransform)
      .typeError(t("errors.fatValid"))
      .required(requiredMessage),
    protein: yup
      .number()
      .transform(numberTransform)
      .typeError(t("errors.proteinValid"))
      .required(requiredMessage),
    currentAmount: yup
      .number()
      .transform(numberTransform)
      .typeError(t("errors.amountValid"))
      .required(requiredMessage),
  });
};

//  Ingredient input schema for ingredient input form validation
export const useIngredientInputSchemaWithoutCurrentAmount = () => {
  const { t } = useTranslation("meals");

  const requiredMessage = t("errors.fieldIsRequired");
  const numberTransform = (
    value: string | number,
    originalValue: string | number,
  ) => (originalValue === "" ? undefined : value);

  return yup.object().shape({
    title: yup.string().trim().required(requiredMessage),
    amount: yup
      .number()
      .transform(numberTransform)
      .typeError(t("errors.amountValid"))
      .required(requiredMessage),
    calories: yup
      .number()
      .transform(numberTransform)
      .typeError(t("errors.caloriesValid"))
      .required(requiredMessage),
    carbs: yup
      .number()
      .transform(numberTransform)
      .typeError(t("errors.carbsValid"))
      .required(requiredMessage),
    fat: yup
      .number()
      .transform(numberTransform)
      .typeError(t("errors.fatValid"))
      .required(requiredMessage),
    protein: yup
      .number()
      .transform(numberTransform)
      .typeError(t("errors.proteinValid"))
      .required(requiredMessage),
  });
};

// Meal input schema for meal input form validation
export const useMealInputSchema = () => {
  const { t } = useTranslation("meals");
  return yup.object().shape({
    title: yup
      .string()
      .trim()
      .required(t("errors.fieldIsRequired"))
      .max(70, t("errors.titleMaxLength", { count: 70 })),
    description: yup
      .string()
      .max(500, t("errors.titleMaxLength", { count: 500 })), // Optional
    ingredients: yup
      .array()
      .of(
        yup.object().shape({
          title: yup.string().required(t("errors.fieldIsRequired")),
          amount: yup.number().required(t("errors.fieldIsRequired")),
          calories: yup.number().required(t("errors.fieldIsRequired")),
          carbs: yup.number().required(t("errors.fieldIsRequired")),
          fat: yup.number().required(t("errors.fieldIsRequired")),
          protein: yup.number().required(t("errors.fieldIsRequired")),
          currentAmount: yup.number().required(t("errors.fieldIsRequired")),
        }),
      )
      .nullable(),
    image: yup
      .mixed<File | "delete" | null>() // File | "delete" | null type
      .nullable() // Allow null (for no image or deleted image)
      .test("fileSize", t("errors.filesIsTooLarge"), (value) => {
        if (value && value !== "delete") {
          const file = value as File;
          return file.size <= 5 * 1024 * 1024;
        }
        return true;
      })
      .test("fileType", t("errors.unsupoortedFileType"), (value) => {
        if (value && value !== "delete") {
          const file = value as File;
          return ["image/jpeg", "image/png", "image/jpg"].includes(file.type);
        }
        return true;
      }),
  });
};
