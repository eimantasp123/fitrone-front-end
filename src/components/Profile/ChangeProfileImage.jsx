import PropTypes from "prop-types";
import { FiUpload, FiTrash } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { deleteUserImage, updateUserImage } from "../../services/reduxSlices/Profile/personalDetailsSlice";
import { useSelector } from "react-redux";
import { Spinner } from "@chakra-ui/react";
import useCustomToast from "../../hooks/useCustomToast";
import { useRef } from "react";

export default function ChangeProfileImage() {
  const dispatch = useDispatch();
  const customToast = useCustomToast();
  const { details, imageLoading, deleteImageLoading } = useSelector((state) => state.personalDetails);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        await dispatch(updateUserImage(file)).unwrap();
        customToast({
          title: "Profile image uploaded successfully.",
          status: "success",
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        customToast({
          title: "Error",
          description: error.message,
          status: "error",
        });
      }
    }
  };

  const handleImageDelete = async () => {
    try {
      await dispatch(deleteUserImage()).unwrap();
      customToast({
        title: "Profile image deleted successfully.",
        status: "success",
      });
    } catch (error) {
      customToast({
        title: "Error",
        description: error.message,
        status: "error",
      });
    }
  };

  return (
    <div className="flex gap-8 px-2 py-5 items-center ">
      <img src={details.profileImage} alt="Profile" className="lg:size-[65px] size-[60px] rounded-full " />
      <div className="flex gap-4">
        <label
          htmlFor="profileImageUpload"
          style={{ width: "120px" }}
          className="cursor-pointer text-secondary transition-shadow duration-300 ease-in-out  hover:shadow-custom-light2 bg-accent1 flex items-center justify-center text-sm gap-2 border py-2 px-4 md:px-6 rounded-full "
        >
          {imageLoading ? (
            <Spinner size="xs" />
          ) : (
            <>
              <FiUpload />
              Upload
            </>
          )}
          <input
            id="profileImageUpload"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
        <button
          type="button"
          onClick={handleImageDelete}
          style={{ width: "120px" }}
          className=" text-sm   transition-shadow duration-300 ease-in-out  hover:shadow-custom-light2 bg-backgroundLight flex justify-center items-center gap-2 border py-2 px-4  md:px-6  rounded-full"
        >
          {deleteImageLoading ? (
            <Spinner size="xs" />
          ) : (
            <>
              <FiTrash />
              Remove
            </>
          )}
        </button>
      </div>
    </div>
  );
}

ChangeProfileImage.propTypes = {
  user: PropTypes.object.isRequired,
};
