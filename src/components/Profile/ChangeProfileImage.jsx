import { Spinner } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { FiTrash, FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserImage,
  updateUserImage,
} from "../../services/reduxSlices/Profile/personalDetailsSlice";

// ChangeProfileImage component
export default function ChangeProfileImage() {
  const { t } = useTranslation("profileSettings");
  const dispatch = useDispatch();
  const { details, imageLoading, deleteImageLoading } = useSelector(
    (state) => state.personalDetails,
  );
  const fileInputRef = useRef(null);

  // Upload image to the server
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await dispatch(updateUserImage(file));
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Delete user profile image
  const handleImageDelete = async () => {
    await dispatch(deleteUserImage());
  };

  return (
    <div className="flex select-none items-center gap-3 px-2 py-5 md:gap-8">
      <img
        src={details.profileImage}
        alt="Profile"
        className="size-[50px] rounded-full object-cover object-top lg:size-[65px]"
      />
      <div className="flex gap-2 md:gap-4">
        {/* Upload button */}
        <label
          htmlFor="profileImageUpload"
          className="tansition-all flex w-[110px] cursor-pointer items-center justify-center gap-2 rounded-full border border-borderPrimary bg-black/90 px-4 py-2 text-sm text-white duration-300 ease-in-out hover:bg-black/75 hover:shadow-custom-light2 dark:bg-white/90 dark:text-black dark:hover:bg-white/75 md:w-[120px] md:px-6"
        >
          {imageLoading ? (
            <Spinner size="xs" />
          ) : (
            <>
              <FiUpload />
              {t("accountSettings.upload")}
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
          className="flex w-[110px] items-center justify-center gap-2 rounded-full border border-borderPrimary bg-transparent px-4 py-2 text-sm transition-all duration-300 ease-in-out hover:bg-backgroundSecondary hover:shadow-custom-light2 dark:hover:bg-white/5 md:w-[120px] md:px-6"
        >
          {deleteImageLoading ? (
            <Spinner size="xs" />
          ) : (
            <>
              <FiTrash />
              {t("accountSettings.remove")}
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
