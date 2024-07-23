import { useState } from "react";
import { Switch, useToast } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import InputFieldWithBorder from "../common/InputFieldWithBorder";

const TwoFactorAuth = () => {
  const user = {
    phoneNumber: "1234567890",
  };

  const methods = useForm({
    defaultValues: {
      phoneNumber: user?.phoneNumber || "",
    },
  });

  const [enabled, setEnabled] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const toast = useToast();

  const handleToggle = () => {
    if (methods.watch("phoneNumber")) {
      setEnabled(!enabled);
    } else {
      toast({
        title: "Error",
        description: "Please add a valid phone number before enabling 2FA.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const onSubmit = async (data) => {
    // Simulate saving the phone number
    console.log(data);
    setEditMode(false);
    setEnabled(true);
    toast({
      title: "Success",
      description: "Phone number saved successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  };

  return (
    <div className="flex flex-col px-8 py-4 xl:flex-col  w-full">
      <h2 className="text-lg font-semibold ">Two Factor Autentication</h2>
      <div className="px-5 flex flex-col gap-5">
        <FormProvider {...methods}>
          <div className="space-y-4 w-full ">
            <div className="flex justify-end items-center">
              <Switch isChecked={enabled} onChange={handleToggle} colorScheme="customAccent" />
            </div>
            <div>
              {enabled ? (
                <p className="text-gray-600">
                  Two-Factor Authentication is <span className="font-semibold">enabled</span>. You will be asked for a
                  verification code when you sign in.
                </p>
              ) : (
                <p className="text-gray-600">
                  Two-Factor Authentication is <span className="font-semibold">disabled</span>. Enable it to add an extra layer of
                  security to your account.
                </p>
              )}
            </div>
            <div className="mt-4">
              <div className="flex flex-col md:flex-row  md:justify-between items-start md:items-center">
                <p className="text-gray-600">
                  {methods.watch("phoneNumber")
                    ? `Current Phone Number: ${methods.watch("phoneNumber")}`
                    : "No phone number provided."}
                </p>
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="mt-2 cursor-pointer bg-accent1 text-sm  text-secondary py-2 px-6 rounded-full"
                    type="button"
                  >
                    {methods.watch("phoneNumber") ? "Edit Phone Number" : "Add Number"}
                  </button>
                )}
              </div>
              <div
                className={`transition-all ease-in-out duration-200 transform ${
                  editMode ? "opacity-100 my-4 translate-y-0 max-h-70" : "opacity-0 max-h-0 -translate-y-[-20px]"
                } ${!editMode && "hidden-after-transition"}`}
                style={{
                  transitionProperty: "opacity, transform, max-height",
                  maxHeight: editMode ? "400px" : "0px",
                  overflow: "hidden",
                }}
              >
                <form onSubmit={methods.handleSubmit(onSubmit)} className=" flex flex-col space-y-2">
                  <InputFieldWithBorder name="phoneNumber" type="text" placeholder="Enter your phone number" />
                  <div className="flex space-x-4">
                    <button
                      className="cursor-pointer text-sm bg-accent1 text-secondary py-2 px-6 rounded-full"
                      type="submit"
                      disabled={!methods.watch("phoneNumber") || methods.formState.isSubmitting}
                    >
                      Save Phone Number
                    </button>
                    <button
                      className="cursor-pointer text-sm bg-secondary text-text1 py-2 px-6 rounded-full"
                      type="button"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
