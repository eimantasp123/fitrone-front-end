import { useContext, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { MdEdit } from "react-icons/md";
import PropTypes from "prop-types";
import InputFieldWithoutBorder from "./common/InputFieldWithoutBorder";
import FormButton from "../components/common/FormButton";
import AuthContext from "../context/AuthContext";

const ProfileSection = ({ title, fields, defaultValues }) => {
  const [editMode, setEditMode] = useState(false);
  const methods = useForm({
    defaultValues: defaultValues,
  });

  const onSubmit = async (data) => {
    // Handle form submission logic
    console.log(data);
    setEditMode(false);
  };

  return (
    <FormProvider {...methods}>
      <div className="p-12 space-y-8 rounded-xl  bg-backgroundLight shadow-custom-light2">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button type="button" onClick={() => setEditMode(!editMode)} className="text-secondary flex items-center">
            {editMode ? (
              <div>Close</div>
            ) : (
              <>
                <MdEdit className="mr-1" /> <span>Edit</span>
              </>
            )}
          </button>
        </div>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field) => (
            <InputFieldWithoutBorder
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              disabled={!editMode}
              placeholder={field.placeholder || field.label}
            />
          ))}
          {editMode && (
            <div className="w-full mt-8 col-span-full">
              <FormButton
                isFormValid={methods.watch("email") && methods.watch("firstName")}
                loading={methods.formState.isSubmitting}
              >
                Save Changes
              </FormButton>
            </div>
          )}
        </form>
      </div>
    </FormProvider>
  );
};

ProfileSection.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  defaultValues: PropTypes.object.isRequired,
};

const EditProfile = () => {
  const { user } = useContext(AuthContext);

  const personalInfoFields = [
    { name: "firstName", label: "First Name", placeholder: "John" },
    { name: "lastName", label: "Last Name", placeholder: "Doe" },
    { name: "email", label: "Email", placeholder: "example@gmail.com", type: "email" },
    { name: "phoneNumber", label: "Phone", placeholder: "(123) 456-7890", type: "tel" },
    { name: "birthday", label: "Birthday", placeholder: "yyyy/mm/dd", type: "date" },
    { name: "backupEmail", label: "Backup Email", placeholder: "example@gmail.com", type: "email" },
  ];

  return (
    <div className="space-y-8">
      <ProfileSection
        title="Personal Information"
        fields={personalInfoFields}
        defaultValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber || "",
          birthday: user.birthday || "",
          nationality: user.nationality || "",
          gender: user.gender || "",
          backupEmail: user.backupEmail || "",
        }}
      />
    </div>
  );
};

export default EditProfile;
