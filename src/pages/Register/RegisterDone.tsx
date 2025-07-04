import FormButton from "@/components/common/FormButton";
import CustomInput from "@/components/common/NewCharkaInput";
import PasswordInput from "@/components/common/PasswordInput";
import { useRegisterSchema } from "@/utils/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaUser } from "react-icons/fa6";
import PasswordStrengthIndicator from "../../components/common/PasswordStrenghtIndicator";
import AuthContext from "../../context/AuthContext";

interface RegisterFormInputs {
  firstName: string;
  lastName?: string;
  password: string;
  passwordConfirm: string;
}

export default function RegisterDone() {
  const { t } = useTranslation("auth");
  const { userEmail, completeRegistration } = useContext(AuthContext);
  const schema = useRegisterSchema();

  // Destructure complete registration method and loading state
  const { execute: registerUser, loading } = completeRegistration;

  // Form methods
  const methods = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit: SubmitHandler<RegisterFormInputs> = async (details) => {
    const data = {
      ...details,
      email: userEmail,
    };
    await registerUser(data);
  };

  // Watch form inputs
  const firstName = methods.watch("firstName");
  const password = methods.watch("password");
  const passwordConfirm = methods.watch("passwordConfirm");

  // Check if form is valid
  const isFormValid = Boolean(
    userEmail && firstName && password && passwordConfirm,
  );

  return (
    <>
      <Helmet>
        <title>{t("registerDone.title")}</title>
      </Helmet>
      <div className="flex w-full max-w-md flex-col justify-center overflow-y-auto px-6 text-textPrimary">
        <div className="text-center">
          <h2 className="mb-3 text-2xl font-semibold lg:mb-6 lg:text-3xl">
            {t("registerDone.title")}
          </h2>
          <div className="flex items-center justify-center">
            <div className="border-border mb-4 rounded-full border px-8 py-[7px] text-[14px] text-textSecondary shadow-custom-light3 lg:mb-9">
              {userEmail}
            </div>
          </div>
        </div>

        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-3"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <CustomInput
              name="firstName"
              type="text"
              placeholder={t("registerDone.firstName")}
              icon={FaUser}
            />
            <CustomInput
              name="lastName"
              type="text"
              placeholder={t("registerDone.lastName")}
              icon={FaUser}
            />
            <PasswordInput
              name="password"
              placeholder={t("registerDone.Password")}
            />
            <PasswordInput
              name="passwordConfirm"
              placeholder={t("registerDone.confirmPassword")}
            />
            <PasswordStrengthIndicator password={password} />
            <div className="mt-3">
              <FormButton isFormValid={isFormValid} loading={loading}>
                {t("registerDone.buttonText")}
              </FormButton>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
