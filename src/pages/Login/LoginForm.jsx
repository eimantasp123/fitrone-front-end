import { MdEmail } from "react-icons/md";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Checkbox,
  CloseButton,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, verifySchema } from "../../utils/validationSchema";
import InputField from "../../components/InputField";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { FcGoogle } from "react-icons/fc";
import { IoLogoFacebook } from "react-icons/io5";
import { useGoogleLogin } from "@react-oauth/google";

const FACEBOOK_APP_ID = "1552748628609748";

export default function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isCredentialManagementAPISupported] = useState(true); // navigator.credentials is not available in this project
  const {
    user,
    login,
    handleSignUp,
    handleForgotPassword,
    loading,
    is2FAStep,
    userId,
    error,
    verifyLogin,
    closeErrorModalHandler,
    handleGoogleLogin,
    handleFacebookLogin,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const loginMethods = useForm({
    resolver: yupResolver(loginSchema),
  });
  const verifyMethods = useForm({
    resolver: yupResolver(verifySchema),
  });
  const email = loginMethods.watch("email");
  const password = loginMethods.watch("password");
  const code = verifyMethods.watch("code");

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Login error: ", err);
    }
  };

  const onVerifySubmit = async (data) => {
    try {
      await verifyLogin(userId, data.code);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Verification error: ", err);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLogin,
    onError: (error) => console.error("Google login error:", error),
  });

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const isLoginDisabled = !email || !password || loading;
  const isVerifyDisabled = !code || loading;

  return (
    <div className="w-full max-w-md h-screen flex  flex-col justify-center px-6 lg:p-6">
      <div className="text-center mb-10">
        <img
          src="/logoIcon.png"
          alt="Logo"
          className="w-24 h-24 mx-auto flex items-center justify-center"
        />
        <h2 className="text-4xl font-bold">Hello Again!</h2>
        <p className="text-gray-500 mt-2">
          Enter your details to proceed further
        </p>
      </div>
      {is2FAStep ? (
        <FormProvider {...verifyMethods}>
          <form
            className="flex gap-2 flex-col"
            onSubmit={verifyMethods.handleSubmit(onVerifySubmit)}
          >
            <InputField
              name="code"
              label="Verification Code"
              placeholder="Enter the code sent to your phone"
              type="text"
            />
            <div className="pt-2">
              <button
                className={`bg-blue-500 shadow transition-all hover:shadow-[0_0_8px_2px_rgba(0,0,0,0.08)] hover:bg-blue-700 duration-200 ease-in-out text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full ${
                  isVerifyDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type="submit"
                disabled={isVerifyDisabled}
              >
                {loading ? <Spinner size="sm" speed="0.7s" /> : "Verify"}
              </button>
              {error && (
                <Box mt={4}>
                  <Alert
                    status="error"
                    variant="subtle"
                    borderRadius={8}
                    position="relative"
                  >
                    <Flex
                      direction="row"
                      align="center"
                      justify="space-between"
                      width="100%"
                    >
                      <Flex align="center" width="90%">
                        <AlertIcon boxSize="18px" />
                        <AlertDescription fontSize="16px" ml={2}>
                          {error}
                        </AlertDescription>
                      </Flex>
                      <CloseButton
                        position="absolute"
                        right="8px"
                        top="8px"
                        size="sm"
                        onClick={closeErrorModalHandler}
                      />
                    </Flex>
                  </Alert>
                </Box>
              )}
            </div>
          </form>
        </FormProvider>
      ) : (
        <>
          <FormProvider {...loginMethods}>
            <form
              className="gap-3 flex flex-col"
              onSubmit={loginMethods.handleSubmit(onSubmit)}
            >
              <InputField
                name="email"
                label="Email"
                placeholder="email@gmail.com"
                type="email"
                icon={MdEmail}
              />
              <InputField
                name="password"
                label="Password"
                placeholder="********"
                type={passwordVisible ? "text" : "password"}
                showPasswordToggle={true}
                togglePasswordVisibility={() =>
                  setPasswordVisible(!passwordVisible)
                }
              />
              <div
                className={`flex items-center  ${
                  !isCredentialManagementAPISupported
                    ? "justify-end"
                    : "justify-between"
                }`}
              >
                {isCredentialManagementAPISupported && (
                  <Checkbox
                    size="md"
                    isChecked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    sx={{
                      "& .chakra-checkbox__control[data-checked]": {
                        bg: "#3b82f6",
                        borderColor: "#3b82f6",
                      },
                      "& .chakra-checkbox__control": {
                        borderColor: "#d1d5db",
                        borderStyle: "solid",
                        borderWidth: "1px",
                      },
                    }}
                  >
                    <span className="text-sm">Remember me</span>
                  </Checkbox>
                )}
                <span
                  className="inline-block align-baseline cursor-pointer text-sm transition-colors
                    
                  duration-200 ease-in-out"
                  onClick={handleForgotPassword}
                >
                  Forgot password
                </span>
              </div>
              <div className="pt-2">
                <button
                  className={`bg-blue-500 shadow transition-all hover:shadow-[0_0_8px_2px_rgba(0,0,0,0.08)] hover:bg-blue-700 duration-200 ease-in-out text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full ${
                    isLoginDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  type="submit"
                  disabled={isLoginDisabled}
                >
                  {loading ? <Spinner size="sm" speed="0.7s" /> : "Log In"}
                </button>
                {error && (
                  <Box mt={4}>
                    <Alert
                      status="error"
                      variant="subtle"
                      borderRadius={8}
                      position="relative"
                    >
                      <Flex
                        direction="row"
                        align="center"
                        justify="space-between"
                        width="100%"
                      >
                        <Flex align="center" width="90%">
                          <AlertIcon boxSize="18px" />
                          <AlertDescription fontSize="16px" ml={2}>
                            {error}
                          </AlertDescription>
                        </Flex>
                        <CloseButton
                          position="absolute"
                          right="8px"
                          top="8px"
                          size="sm"
                          onClick={closeErrorModalHandler}
                        />
                      </Flex>
                    </Alert>
                  </Box>
                )}
              </div>
            </form>
          </FormProvider>
          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-xs text-gray-500">OR</span>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="text-center w-1/2">
              <button
                className="bg-white border shadow-none transition-shadow duration-200 ease-in-out hover:shadow-[0_0_8px_2px_rgba(0,0,0,0.08)] gap-2 border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg w-full flex items-center justify-center"
                onClick={() => googleLogin()}
              >
                <FcGoogle className="text-xl" /> Google
              </button>
            </div>
            <div className="text-center w-1/2">
              <FacebookLogin
                appId={FACEBOOK_APP_ID}
                onSuccess={handleFacebookLogin}
                onFail={(error) =>
                  console.error("Facebook login error:", error)
                }
                render={(renderProps) => (
                  <button
                    className="bg-white border shadow-none transition-shadow duration-200 ease-in-out hover:shadow-[0_0_8px_2px_rgba(0,0,0,0.08)] gap-2 border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg w-full flex items-center justify-center"
                    onClick={renderProps.onClick}
                  >
                    <IoLogoFacebook className="text-xl text-blue-700" />{" "}
                    Facebook
                  </button>
                )}
              />
            </div>
          </div>
        </>
      )}
      <div className="text-center mt-10">
        <p className="text-gray-500">
          Don&apos;t have an account yet?{" "}
          <span
            onClick={handleSignUp}
            className="text-blue-500 cursor-pointer font-semibold"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
