import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFieldWithBorder from "../common/InputFieldWithBorder";
import FormButton from "../../components/common/FormButton";
import ChangeProfileImage from "../../components/Profile/ChangeProfileImage";
import { Spinner } from "@chakra-ui/react";
import { editProfileSchema } from "../../utils/validationSchema";
import CustomPhoneInput from "../common/CustomPhoneInput";
import { MdEdit } from "react-icons/md";
import { FaUser, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { updatePersonalDetails } from "../../services/reduxSlices/Profile/personalDetailsSlice";
import { useDispatch } from "react-redux";
import useCustomToast from "../../hooks/useCustomToast";

const personalInfoFields = [
  { name: "firstName", label: "First Name", placeholder: "", icon: FaUser },
  { name: "lastName", label: "Last Name", placeholder: "", icon: FaUser },
  { name: "email", label: "Email", placeholder: "", type: "email", icon: MdEmail, disabled: true },
];

const EditProfile = () => {
  const { details: user, updateDetailsLoading } = useSelector((state) => state.personalDetails);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const customToast = useCustomToast();

  const methods = useForm({
    resolver: yupResolver(editProfileSchema),
  });

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

  return (
    <div className="flex flex-col bg-backgroundLight rounded-lg shadow-custom-dark2 p-8 xl:flex-col w-full">
      {/* <h2 className="text-lg font-semibold mb-5">My Profile</h2> */}
      <div className="px-5 flex flex-col gap-5">
        <ChangeProfileImage user={user} />
        <FormProvider {...methods}>
          <div className="space-y-8 w-full">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Personal Information</h3>
              <button type="button" onClick={() => setEditMode(!editMode)} className="text-secondary flex items-center">
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
              className="grid grid-cols-1 overflow-hidden md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-x-8"
            >
              {personalInfoFields.map((field) => (
                <InputFieldWithBorder
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  disabled={field.disabled || !editMode}
                  Icon={field.icon}
                />
              ))}
              <CustomPhoneInput
                value={methods.watch("phone")}
                onChange={(value) => methods.setValue("phone", value || "")}
                label="Phone"
                placeholder="(123) 456-7890"
                disabled={!editMode}
                Icon={FaPhone}
                error={methods.formState.errors.phone?.message}
              />
              <div
                className={`transition-all pt-2 md:pt-3 ease-in-out duration-500 transform ${
                  editMode ? "opacity-100 my-4 translate-y-0 max-h-40" : "opacity-0 max-h-0 -translate-y-[-50px]"
                } col-span-full`}
              >
                <div className="w-full">
                  <FormButton
                    isFormValid={methods.watch("firstName") && methods.watch("email")}
                    loading={methods.formState.isSubmitting}
                  >
                    {updateDetailsLoading ? <Spinner size="sm" /> : "Save Changes"}
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
