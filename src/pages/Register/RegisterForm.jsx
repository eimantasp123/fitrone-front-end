import { MdEmail } from "react-icons/md";
import { useContext, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Checkbox,
  CloseButton,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../components/InputField";
import { registerSchema } from "../../utils/validationSchema";
import AuthContext from "../../context/AuthContext";

export default function RegisterForm() {
  const [passwordVisibleFirst, setPasswordVisibleFirst] = useState(false);
  const [passwordVisibleSecond, setPasswordVisibleSecond] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const {
    register: registerUser,
    loading,
    error,
    successMessage,
    closeErrorModalHandler,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(registerSchema),
  });

  const handleSignIn = () => {
    navigate("/login");
  };

  const onSubmit = async (data) => {
    await registerUser(data);
  };

  const email = methods.watch("email");
  const firstName = methods.watch("firstName");
  const lastName = methods.watch("lastName");
  const password = methods.watch("password");
  const confirmPassword = methods.watch("confirmPassword");

  const isFormValid =
    email &&
    firstName &&
    lastName &&
    password &&
    confirmPassword &&
    termsAccepted;

  return (
    <div className="w-full max-w-md h-screen flex flex-col justify-center px-6 lg:p-6">
      <div className="text-center mb-10">
        <img
          src="/logoIcon.png"
          alt="Logo"
          className="w-24 h-24 mx-auto flex items-center justify-center"
        />
        <h2 className="text-4xl font-bold">Tell us about yourself</h2>
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
                Your registraction was successful!
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                Please check your email to verify your account.
              </AlertDescription>
            </Box>
          </Alert>
        </Box>
      ) : (
        <FormProvider {...methods}>
          <form
            className="flex gap-3 flex-col"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <InputField
              name="email"
              label="Email"
              type="email"
              placeholder="email@gmail.com"
              icon={MdEmail}
            />
            <div className="flex gap-3">
              <div className="w-1/2">
                <InputField
                  name="firstName"
                  label="First Name"
                  type="text"
                  placeholder="John"
                  icon={FaUser}
                />
              </div>
              <div className="w-1/2">
                <InputField
                  name="lastName"
                  label="Last Name"
                  type="text"
                  placeholder="Doe"
                  icon={FaUser}
                />
              </div>
            </div>
            <InputField
              name="password"
              label="Password"
              type={passwordVisibleFirst ? "text" : "password"}
              placeholder="********"
              showPasswordToggle={true}
              togglePasswordVisibility={() =>
                setPasswordVisibleFirst(!passwordVisibleFirst)
              }
            />
            <InputField
              name="confirmPassword"
              label="Confirm Password"
              type={passwordVisibleSecond ? "text" : "password"}
              placeholder="********"
              showPasswordToggle={true}
              togglePasswordVisibility={() =>
                setPasswordVisibleSecond(!passwordVisibleSecond)
              }
            />
            <div className="flex items-center justify-between mb-4">
              <Checkbox
                size="md"
                isChecked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
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
                <span className="text-sm">I agree with terms & conditions</span>
              </Checkbox>
            </div>

            <button
              className={`bg-blue-500 shadow transition-all hover:shadow-[0_0_8px_2px_rgba(0,0,0,0.08)] hover:bg-blue-700 duration-200 ease-in-out text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full ${
                !isFormValid || loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={!isFormValid || loading}
            >
              {loading ? <Spinner size="sm" /> : "Continue"}
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
          </form>
        </FormProvider>
      )}
      {!successMessage && (
        <div className="text-center mt-10">
          <p className="text-gray-500">
            Do you already have an account?{" "}
            <span
              onClick={handleSignIn}
              className="text-blue-500 cursor-pointer font-semibold"
            >
              Sign In
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
