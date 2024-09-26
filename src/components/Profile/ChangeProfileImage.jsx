import { Spinner } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useRef } from "react";
import { FiTrash, FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import useCustomToast from "../../hooks/useCustomToast";
import {
  deleteUserImage,
  updateUserImage,
} from "../../services/reduxSlices/Profile/personalDetailsSlice";

// ChangeProfileImage component
export default function ChangeProfileImage() {
  const dispatch = useDispatch();
  const customToast = useCustomToast();
  const { details, imageLoading, deleteImageLoading } = useSelector(
    (state) => state.personalDetails,
  );
  const fileInputRef = useRef(null);

  // Upload image to the server
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

  // Delete user profile image
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
    <div className="flex select-none flex-col items-center gap-8 px-2 py-5 sm:flex-row">
      <img
        src={details.profileImage}
        alt="Profile"
        className="size-[60px] rounded-full lg:size-[65px]"
      />
      <div className="flex gap-4">
        {/* Upload button */}
        <label
          htmlFor="profileImageUpload"
          style={{ width: "120px" }}
          className="tansition-all flex cursor-pointer items-center justify-center gap-2 rounded-full border border-borderColor bg-buttonPrimaryDark px-4 py-2 text-sm text-white duration-300 ease-in-out hover:bg-buttonPrimaryDarkHover hover:shadow-custom-light2 md:px-6"
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

        {/* Remove button */}
        <button
          type="button"
          onClick={handleImageDelete}
          style={{ width: "120px" }}
          className="flex items-center justify-center gap-2 rounded-full border border-borderColor bg-background px-4 py-2 text-sm transition-all duration-300 ease-in-out hover:shadow-custom-light2 md:px-6"
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
