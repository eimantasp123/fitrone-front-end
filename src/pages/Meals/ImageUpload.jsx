import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FiTrash } from "react-icons/fi";

export default function ImageUpload({ meal = null }) {
  const { t } = useTranslation("profileSettings", "meals");
  const [previewImage, setPreviewImage] = useState(meal?.image || null);
  const [imageFileName, setImageFileName] = useState(null);
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file);
      setImageFileName(file.name);
      setPreviewImage(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  const handleImageDelete = () => {
    setPreviewImage(null);
    setValue("image", "delete");
    setImageFileName(null);
  };

  return (
    <>
      <div className="text-[13px]">{t("meals:selectImage")}</div>
      <div className="flex select-none items-center gap-3 pb-5 md:gap-8">
        {previewImage && (
          <img
            src={previewImage}
            alt="Upload image"
            className="size-[50px] rounded-md object-cover object-top lg:size-[50px]"
          />
        )}
        <div className="flex gap-2 md:gap-4">
          {/* Upload button */}
          <label
            htmlFor="mealImageUpload"
            className="tansition-all flex w-[110px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-borderPrimary bg-black/90 px-4 py-2 text-sm text-white duration-300 ease-in-out hover:bg-black/75 hover:shadow-custom-light2 dark:bg-white/90 dark:text-black dark:hover:bg-white/75 md:w-[120px] md:px-6"
          >
            {t("accountSettings.upload")}
            <input
              id="mealImageUpload"
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
            className="flex w-[110px] items-center justify-center gap-2 rounded-lg border border-borderPrimary bg-transparent px-4 py-2 text-sm transition-all duration-300 ease-in-out hover:bg-backgroundSecondary hover:shadow-custom-light2 dark:hover:bg-white/5 md:w-[120px] md:px-6"
          >
            <FiTrash />
            {t("accountSettings.remove")}
          </button>
          {imageFileName && (
            <span className="flex items-center text-xs">{imageFileName}</span>
          )}
        </div>
        {errors.image && (
          <p className="text-sm text-red-500">{errors.image.message}</p>
        )}
      </div>
    </>
  );
}
