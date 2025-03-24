import * as yup from "yup";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

// Login schema for login form validation
export const useLoginSchema = () => {
  const { t } = useTranslation("auth");
  return yup.object().shape({
    email: yup
      .string()
      .trim()
      .email(t("validation.invalidEmail"))
      .required(t("validation.requiredEmail")),
    password: yup
      .string()
      .trim()
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
      .trim()
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
      .trim()
      .transform((value) => (value ? value.toLowerCase() : value))
      .required(t("validation.firstNameRequired"))
      .min(3, t("validation.minFirstName", { count: 3 })),
    lastName: yup
      .string()
      .trim()
      .transform((value) => (value ? value.toLowerCase() : value)),
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
      .trim()
      .transform((value) => (value ? value.toLowerCase() : value))
      .required(t("validation.firstNameRequired"))
      .min(3, t("validation.firstNameMin", { count: 3 })),
    lastName: yup
      .string()
      .trim()
      .transform((value) => (value ? value.toLowerCase() : value))
      .max(50, t("validation.lastNameMax", { count: 50 })),
    email: yup
      .string()
      .trim()
      .email(t("validation.invalidEmail"))
      .max(100, t("validation.maxEmail", { count: 100 })),
    phone: yup
      .string()
      .trim()
      .matches(phoneRegex, {
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

// System problem schema for form validation
export const useSystemProblemSchema = () => {
  const { t } = useTranslation("header");
  return yup.object().shape({
    problem: yup.string(),
    message: yup
      .string()
      .required(t("systemProblemModal.validation.message"))
      .max(500, t("systemProblemModal.validation.messageMax")),
  });
};

//  Ingredient input schema for ingredient input form validation
export const useIngredientInputSchema = () => {
  const { t } = useTranslation("meals");

  const requiredMessage = t("errors.fieldIsRequired");
  const numberTransform = (
    value: string | number,
    originalValue: string | number,
  ) => (originalValue === "" ? undefined : Number(value));

  return yup.object().shape({
    title: yup
      .string()
      .trim()
      .transform((value) => (value ? value.toLowerCase() : value))
      .required(requiredMessage),
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
    title: yup
      .string()
      .trim()
      .transform((value) => (value ? value.toLowerCase() : value))
      .required(requiredMessage),
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
      .max(100, t("errors.titleMaxLength", { count: 100 })),
    description: yup
      .string()
      .max(2500, t("errors.titleMaxLength", { count: 2500 })), // Optional
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

/**
 *  Meal input schema for meal input form validation
 */
export const useCreateMenuSchema = () => {
  const { t } = useTranslation("weeklyMenu");
  return yup.object().shape({
    title: yup
      .string()
      .required(t("validation.titleRequired"))
      .min(3, t("validation.titleLength"))
      .max(70, t("validation.titleLength")),
    description: yup.string().max(500, t("validation.descriptionLength")),
  });
};

/**
 *  Customer schema for send form to customer form validation
 */
export const useCustomerSendForm = () => {
  const { t } = useTranslation("profileSettings");
  return yup.object().shape({
    firstName: yup
      .string()
      .transform((value) => (value ? value.toLowerCase() : value))
      .required(t("validation.firstNameRequired"))
      .min(2, t("validation.firstNameMin", { count: 2 }))
      .max(100, t("validation.firstNameMax", { count: 100 })),
    email: yup
      .string()
      .required(t("validation.requiredEmail"))
      .email(t("validation.invalidEmail"))
      .max(100, t("validation.maxEmail", { count: 100 })),
  });
};

/**
 * Customer schema for send form to customer form validation
 */
export const useCustomerDetails = () => {
  const { t } = useTranslation(["common", "profileSettings"]);

  const requiredMessage = t("validationErrors.fieldIsRequired");
  const numberTransform = (
    value: string | number,
    originalValue: string | number,
  ) => (originalValue === "" ? undefined : Number(value));

  return yup.object().shape({
    firstName: yup
      .string()
      .trim()
      .transform((value) => (value ? value.toLowerCase() : value))
      .required(requiredMessage),
    lastName: yup
      .string()
      .trim()
      .transform((value) => (value ? value.toLowerCase() : value))
      .required(requiredMessage),
    email: yup
      .string()
      .required(t("profileSettings:validation.requiredEmail"))
      .email(t("profileSettings:validation.invalidEmail"))
      .max(100, t("profileSettings:validation.maxEmail", { count: 100 })),
    phone: yup
      .string()
      .required(requiredMessage)
      .matches(phoneRegex, {
        message: t("validationErrors.invalidPhoneNumber"),
        excludeEmptyString: false,
      }),
    age: yup
      .number()
      .transform(numberTransform)
      .typeError(t("validationErrors.invalidAge"))
      .required(requiredMessage),
    height: yup
      .number()
      .transform(numberTransform)
      .typeError(t("validationErrors.invalidHeight"))
      .required(requiredMessage),
    weight: yup
      .number()
      .transform(numberTransform)
      .typeError(t("validationErrors.invalidWeight"))
      .required(requiredMessage),
    additionalInfo: yup
      .string()
      .trim()
      .max(500, t("validationErrors.maxLength", { count: 500 })),
    weightGoal: yup
      .number()
      .transform(numberTransform)
      .typeError(t("validationErrors.invalidWeightGoal")),
    gender: yup.string().trim().required(requiredMessage),
    address: yup.string().required(requiredMessage),
    foodAllergies: yup.string().trim(),
    physicalActivityLevel: yup.string().trim().required(requiredMessage),
    fitnessGoal: yup.string().trim().required(requiredMessage),
    preferences: yup
      .array()
      .of(yup.string().trim().required(requiredMessage))
      .min(1, t("validationErrors.selectOne"))
      .required(requiredMessage),
    restrictions: yup.array().of(yup.string().trim().defined()),
  });
};

/**
 *  Create new group schema for create new group form validation
 */
export const useCreateNewGroupSchema = () => {
  const { t } = useTranslation(["weeklyMenu", "groups"]);
  return yup.object().shape({
    title: yup
      .string()
      .required(t("validation.titleRequired"))
      .min(3, t("validation.titleLength"))
      .max(70, t("validation.titleLength")),
    description: yup
      .string()
      .max(500, t("validation.customDescriptionLength", { count: 500 })),
  });
};
