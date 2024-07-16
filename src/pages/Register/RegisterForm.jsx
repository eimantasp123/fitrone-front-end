import { MdEmail } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../components/common/InputField";
import { registerSchema } from "../../utils/validationSchema";
import AuthContext from "../../context/AuthContext";
import ErrorAlert from "../../components/common/ErrorAlert";
import SuccessulAlert from "../../components/common/SuccessulAlert";
import PasswordStrengthIndicator from "../../components/common/PasswordStrenghtIndicator";
import FormButton from "../../components/common/FormButton";
import SignUpPrompt from "../../components/common/SignUpPrompt";
import CustomCheckbox from "../../components/common/CustomCheckBox";

export default function RegisterForm() {
  const [passwordVisibleFirst, setPasswordVisibleFirst] = useState(false);
  const [passwordVisibleSecond, setPasswordVisibleSecond] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { register, successMessage, handleSignIn } = useContext(AuthContext);

  const { execute: registerUser, loading, error, clearError } = register;

  const methods = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    await registerUser(data);
  };

  const email = methods.watch("email");
  const firstName = methods.watch("firstName");
  const lastName = methods.watch("lastName");
  const password = methods.watch("password");
  const confirmPassword = methods.watch("confirmPassword");

  const isFormValid = email && firstName && lastName && password && confirmPassword && termsAccepted;

  useEffect(() => {
    clearError();
    return () => clearError();
  }, [clearError]);

  return (
    <div className="w-full max-w-md h-screen flex flex-col justify-center px-6 lg:p-6">
      <div className="text-center mb-10">
        <img src="/logoIcon.png" alt="Logo" className="w-24 h-24 mx-auto flex items-center justify-center" />
        <h2 className="text-4xl font-bold">Tell us about yourself</h2>
        <p className="text-gray-500 mt-2">Enter your details to proceed further</p>
      </div>
      {successMessage ? (
        <SuccessulAlert
          successMessage="Your registraction was successful!"
          description=" Please check your email to verify your account."
        />
      ) : (
        <FormProvider {...methods}>
          <form className="flex gap-3 flex-col" onSubmit={methods.handleSubmit(onSubmit)}>
            <InputField name="email" label="Email" type="email" placeholder="email@gmail.com" icon={MdEmail} />
            <div className="flex gap-3">
              <div className="w-1/2">
                <InputField name="firstName" label="First Name" type="text" placeholder="John" icon={FaUser} />
              </div>
              <div className="w-1/2">
                <InputField name="lastName" label="Last Name" type="text" placeholder="Doe" icon={FaUser} />
              </div>
            </div>
            <InputField
              name="password"
              label="Password"
              type={passwordVisibleFirst ? "text" : "password"}
              placeholder="••••••••••"
              showPasswordToggle={true}
              togglePasswordVisibility={() => setPasswordVisibleFirst(!passwordVisibleFirst)}
            />
            <PasswordStrengthIndicator password={password} />
            <InputField
              name="confirmPassword"
              label="Confirm Password"
              type={passwordVisibleSecond ? "text" : "password"}
              placeholder="••••••••••"
              showPasswordToggle={true}
              togglePasswordVisibility={() => setPasswordVisibleSecond(!passwordVisibleSecond)}
            />
            <div className="flex items-center justify-between mb-4">
              <CustomCheckbox
                label="I agree with terms & conditions"
                isChecked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
            </div>

            <FormButton isFormValid={isFormValid} loading={loading}>
              Continue
            </FormButton>
          </form>
          <ErrorAlert error={error} clearError={clearError} />
        </FormProvider>
      )}
      {!successMessage && (
        <SignUpPrompt handleSignUp={handleSignIn} message="Do you already have an account?" linkText="Sign In" className="mt-5" />
      )}
    </div>
  );
}
