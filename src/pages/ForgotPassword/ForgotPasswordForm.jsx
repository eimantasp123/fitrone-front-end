import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { forgotPasswordSchema } from "../../utils/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../components/InputField";
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

export default function ForgotPasswordForm() {
  const {
    forgotPassword,
    error,
    handleSignUp,
    handleSignIn,
    successMessage,
    resetUserEmail,
    loading,
    closeErrorModalHandler,
  } = useContext(AuthContext);
  const methods = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });
  const email = methods.watch("email");

  const onSubmit = async (data) => {
    await forgotPassword(data.email);
  };

  return (
    <div className="w-full max-w-md h-screen flex flex-col justify-center px-6 lg:p-6">
      <div className="text-center mb-10">
        <img
          src="/logoIcon.png"
          alt="Logo"
          className="w-24 h-24 mx-auto flex items-center justify-center"
        />
        <h2 className="text-4xl font-bold">Forgot Password</h2>
        <p className="text-gray-500 mt-2">
          Enter your details to proceed further
        </p>
      </div>
      {successMessage ? (
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
                An email is on the way to <strong>{resetUserEmail}</strong> with
                instructions for resetting your password.
              </AlertDescription>
            </Box>
          </Alert>
        </Box>
      ) : (
        <FormProvider {...methods}>
          <form
            className="gap-2 flex flex-col"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <InputField
              name="email"
              label="Email"
              placeholder="email@gmail.com"
              type="email"
              icon={MdEmail}
            />
            <div className="pt-2">
              <button
                className={`bg-blue-500 text-white font-semibold ${
                  !email || loading ? "opacity-50 cursor-not-allowed" : ""
                } py-3 px-4 rounded-lg w-full`}
                type="submit"
                disabled={!email || loading}
              >
                {loading ? (
                  <Spinner size="sm" speed="0.7s" />
                ) : (
                  "Send Reset Link"
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

      {!successMessage && (
        <>
          <div className="text-center mt-10">
            <span
              onClick={handleSignIn}
              className="text-blue-500 cursor-pointer font-semibold"
            >
              Back to Login
            </span>
          </div>

          <div className="text-center mt-6">
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
        </>
      )}
    </div>
  );
}
