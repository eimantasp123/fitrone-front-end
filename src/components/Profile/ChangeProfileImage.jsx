import PropTypes from "prop-types";
import { FiUpload, FiTrash } from "react-icons/fi";

export default function ChangeProfileImage({ user }) {
  console.log(user.profileImage);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {};
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex gap-8 px-2 py-5 items-center ">
      <img src={user.profileImage} alt="Profile" className="lg:size-[70px] size-[60px] rounded-full " />
      <div className="flex gap-4">
        <label
          htmlFor="profileImageUpload"
          className="cursor-pointer text-secondary transition-shadow duration-300 ease-in-out  hover:shadow-custom-light2 bg-accent1 flex items-center text-sm gap-2 border py-2 px-4 md:px-6 rounded-full "
        >
          <FiUpload />
          Upload
          <input id="profileImageUpload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </label>
        <button
          type="button"
          className=" text-sm   transition-shadow duration-300 ease-in-out  hover:shadow-custom-light2  flex items-center gap-2 border py-2 px-4  md:px-6  rounded-full"
        >
          <FiTrash />
          Remove
        </button>
      </div>
    </div>
  );
}

ChangeProfileImage.propTypes = {
  user: PropTypes.object.isRequired,
};
