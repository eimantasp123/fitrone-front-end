import { useContext, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import AuthContext from "../../context/AuthContext";
import { FaUser, FaPhone, FaRegCalendarCheck } from "react-icons/fa";
import { MdEmail, MdEdit } from "react-icons/md";
import InputFieldWithBorder from "../common/InputFieldWithBorder";
import FormButton from "../../components/common/FormButton";
import ChangeProfileImage from "../../components/Profile/ChangeProfileImage";

const EditProfile = () => {
  const { user } = useContext(AuthContext);
  const methods = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber || "",
      birthday: user.birthday || "",
      backupEmail: user.backupEmail || "",
    },
  });

  const personalInfoFields = [
    { name: "firstName", label: "First Name", placeholder: "John", icon: FaUser },
    { name: "lastName", label: "Last Name", placeholder: "Doe", icon: FaUser },
    { name: "email", label: "Email", placeholder: "example@gmail.com", type: "email", icon: MdEmail },
    { name: "phoneNumber", label: "Phone", placeholder: "(123) 456-7890", type: "tel", icon: FaPhone },
    { name: "birthday", label: "Birthday", type: "date", icon: FaRegCalendarCheck },
    { name: "backupEmail", label: "Backup Email", placeholder: "example@gmail.com", type: "email", icon: MdEmail },
  ];

  const [editMode, setEditMode] = useState(false);

  const onSubmit = async (data) => {
    // Handle form submission logic
    console.log(data);
    setEditMode(false);
  };

  return (
    <div className="flex flex-col px-8 py-4 xl:flex-col  w-full">
      <h2 className="text-lg font-semibold mb-5">My Profile</h2>
      <div className="px-5 flex flex-col gap-5">
        <ChangeProfileImage user={user} />
        <FormProvider {...methods}>
          <div className=" space-y-8 w-full ">
            <div className="flex justify-between items-center">
              <h3 className=" font-semibold">Personal Information</h3>
              <button type="button" onClick={() => setEditMode(!editMode)} className="text-secondary flex items-center">
                {editMode ? (
                  <div>Close</div>
                ) : (
                  <div className="flex items-center">
                    <MdEdit className="mr-1" />
                    <span>Edit</span>
                  </div>
                )}
              </button>
            </div>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="grid grid-cols-1 overflow-hidden md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-x-8 "
            >
              {personalInfoFields.map((field) => (
                <InputFieldWithBorder
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder || field.label}
                  disabled={!editMode}
                  Icon={field.icon}
                />
              ))}
              <div
                className={`transition-all pt-2 md:pt-3 ease-in-out duration-500 transform ${
                  editMode ? "opacity-100 my-4  translate-y-0 max-h-40" : "opacity-0 max-h-0 -translate-y-[-50px]"
                } col-span-full`}
              >
                <div className="w-full">
                  <FormButton
                    isFormValid={methods.watch("firstName") && methods.watch("lastName") && methods.watch("email")}
                    loading={methods.formState.isSubmitting}
                  >
                    Save Changes
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
