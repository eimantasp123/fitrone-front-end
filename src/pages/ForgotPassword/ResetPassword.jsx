import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "../../utils/validationSchema";
import InputField from "../../components/InputField";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import AuthContext from "../../context/AuthContext";

export default function ResetPasswordForm() {
  const [passwordVisibleFirst, setPasswordVisibleFirst] = useState(false);
  const [passwordVisibleSecond, setPasswordVisibleSecond] = useState(false);
  const {
    resetPassword,
    error,
    handleSignIn,
    closeErrorModalHandler,
    successMessage,
    loading,
  } = useContext(AuthContext);
  const methods = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });
  const { token } = useParams();
  const password = methods.watch("password");
  const confirmPassword = methods.watch("confirmPassword");

  const onSubmit = async (data) => {
    await resetPassword(token, data.password);
  };

  return (
    <div className="w-full max-w-md h-screen flex flex-col justify-center px-6 lg:p-6">
      <div className="text-center mb-10">
        <img
          src="/logoIcon.png"
          alt="Logo"
          className="w-24 h-24 mx-auto flex items-center justify-center"
        />
        <h2 className="text-4xl font-bold">Reset Password</h2>
      </div>
      {successMessage ? (
        <>
          <Box
            maxW="md"
            mx="auto"
            p={2}
            bg="gray.100"
            borderRadius="md"
            boxShadow="sm"
          >
            <Alert
              status="info"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              bg="gray.100"
              justifyContent="center"
              textAlign="center"
              height="auto"
            >
              <AlertIcon color="gray.800" boxSize="25px" mb={3} />
              <Box>
                <AlertTitle mb={2} fontSize="lg">
                  {successMessage}
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  Password reset successfully. You can now log in with your new
                  password.
                </AlertDescription>
              </Box>
            </Alert>
          </Box>

          <div className="text-center mt-10">
            <span
              onClick={handleSignIn}
              className="text-gray-800 cursor-pointer font-semibold"
            >
              Back to Login
            </span>
          </div>
        </>
      ) : (
        <FormProvider {...methods}>
          <form
            className="gap-3 flex flex-col"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <InputField
              name="password"
              label="New Password"
              placeholder="********"
              type={passwordVisibleFirst ? "text" : "password"}
              showPasswordToggle={true}
              togglePasswordVisibility={() =>
                setPasswordVisibleFirst(!passwordVisibleFirst)
              }
            />
            <InputField
              name="confirmPassword"
              label="Confirm New Password"
              placeholder="********"
              type={passwordVisibleSecond ? "text" : "password"}
              showPasswordToggle={true}
              togglePasswordVisibility={() =>
                setPasswordVisibleSecond(!passwordVisibleSecond)
              }
            />

            <div className="mt-2">
              <button
                className={`bg-blue-500 shadow transition-all hover:shadow-[0_0_8px_2px_rgba(0,0,0,0.08)] hover:bg-blue-700 duration-200 ease-in-out text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full ${
                  !password || !confirmPassword || loading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                type="submit"
                disabled={!password || !confirmPassword || loading}
              >
                {loading ? (
                  <Spinner size="sm" speed="0.7s" />
                ) : (
                  "Reset Password"
                )}
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
      )}
    </div>
  );
}
