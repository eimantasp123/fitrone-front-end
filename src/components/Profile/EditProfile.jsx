import { Spinner } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaPhone, FaUser } from "react-icons/fa";
import { MdEdit, MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import FormButton from "../../components/common/FormButton";
import ChangeProfileImage from "../../components/Profile/ChangeProfileImage";
import useCustomToast from "../../hooks/useCustomToast";
import { updatePersonalDetails } from "../../services/reduxSlices/Profile/personalDetailsSlice";
import { editProfileSchema } from "../../utils/validationSchema";
import InputField from "../common/InputField";

// Fields for personal information
const personalInfoFields = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "",
    type: "text",
    icon: FaUser,
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "",
    type: "text",
    icon: FaUser,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "",
    type: "email",
    icon: MdEmail,
    disabled: true,
  },
  {
    name: "phone",
    label: "Phone Number",
    placeholder: "+000",
    type: "tel",
    icon: FaPhone,
  },
];

// EditProfile component
const EditProfile = () => {
  const { details: user, updateDetailsLoading } = useSelector(
    (state) => state.personalDetails,
  );
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const customToast = useCustomToast();

  const methods = useForm({
    resolver: yupResolver(editProfileSchema),
  });

  // Set form data when user details are fetched from the server
  useEffect(() => {
    if (user) {
      methods.reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user, methods]);

  // Submit form data to update user details
  const onSubmit = async (data) => {
    // Filter out fields that have not been changed
    const filteredFields = Object.keys(data).reduce((acc, key) => {
      if (data[key] !== user[key]) {
        acc[key] = data[key];
      }
      return acc;
    }, {});

    // If no changes made, show a toast and return
    if (Object.keys(filteredFields).length === 0) {
      customToast({
        title: "No changes made",
        status: "info",
      });
      return;
    }

    try {
      await dispatch(updatePersonalDetails(filteredFields)).unwrap();
      setEditMode(false);
      customToast({
        title: "Profile updated successfully.",
        status: "success",
      });
    } catch (error) {
      customToast({
        title: "Error updating profile",
        description: error.message,
        status: "error",
      });
    }
  };

  // Toggle edit mode
  const handleOpen = () => {
    methods.clearErrors();
    methods.reset();
    setEditMode((prev) => !prev);
  };

  return (
    <div className="border-border flex w-full select-none flex-col rounded-lg border bg-background p-5 shadow-custom-dark2 sm:p-8 xl:flex-col">
      <div className="flex flex-col gap-5">
        {/* Profile image  */}
        <ChangeProfileImage user={user} />

        {/* Profile settings form */}
        <FormProvider {...methods}>
          <div className="w-full space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Personal Information</h3>
              <button
                type="button"
                onClick={handleOpen}
                className="text-secondary flex items-center"
              >
                {editMode ? (
                  <div className="text-sm">Close</div>
                ) : (
                  <div className="flex items-center">
                    <MdEdit className="mr-1" />
                    <span className="text-sm">Edit</span>
                  </div>
                )}
              </button>
            </div>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-x-8 gap-y-4 overflow-hidden md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2"
            >
              {/* Data inputs */}
              {personalInfoFields.map((field) => (
                <InputField
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  disabled={field.disabled || !editMode}
                  Icon={field.icon}
                />
              ))}
              <div
                className={`transform pt-2 transition-all duration-500 ease-in-out md:pt-3 ${
                  editMode
                    ? "my-4 max-h-40 translate-y-0 opacity-100"
                    : "max-h-0 -translate-y-[-50px] opacity-0"
                } col-span-full`}
              >
                <div className="w-full">
                  <FormButton
                    isFormValid={
                      methods.watch("firstName") && methods.watch("email")
                    }
                    loading={methods.formState.isSubmitting}
                  >
                    {updateDetailsLoading ? (
                      <Spinner size="sm" />
                    ) : (
                      "Save Changes"
                    )}
                  </FormButton>
                </div>
              </div>
            </form>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default EditProfile;
