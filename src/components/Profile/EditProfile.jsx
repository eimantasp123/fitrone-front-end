import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import ProfileSection from "../../components/ProfileSection";

const EditProfile = () => {
  const { user } = useContext(AuthContext);

  const personalInfoFields = [
    { name: "firstName", label: "First Name", placeholder: "John" },
    { name: "lastName", label: "Last Name", placeholder: "Doe" },
    { name: "email", label: "Email", placeholder: "example@gmail.com", type: "email" },
    { name: "phoneNumber", label: "Phone", placeholder: "(123) 456-7890", type: "tel" },
    { name: "birthday", label: "Birthday", type: "date" },
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
          backupEmail: user.backupEmail || "",
          placeOfBirth: user.placeOfBirth || "",
        }}
      />
    </div>
  );
};

export default EditProfile;
