import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FiTrash } from "react-icons/fi";

interface ImageUploaderProps {
  image?: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ image = null }) => {
  const { t } = useTranslation(["profileSettings", "meals"]);
  const [previewImage, setPreviewImage] = useState<string | null>(
    image ?? null,
  );
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file, { shouldValidate: true });
      setPreviewImage(URL.createObjectURL(file));
      setImageFileName(file.name);
    }
  };

  const handleImageDelete = () => {
    setPreviewImage(null);
    setValue("image", "delete", { shouldValidate: true });
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
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
          {/* Upload button */}
          <div className="md-gap-4 flex gap-2">
            <label
              htmlFor="mealImageUpload"
              className="tansition-all flex w-[110px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-borderPrimary bg-primary px-4 py-2 text-sm text-black duration-300 ease-in-out hover:bg-primaryLight hover:shadow-custom-light2 dark:hover:bg-primaryDark md:w-[120px] md:px-6"
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
          </div>
          {imageFileName && (
            <span className="w-[230px] items-center text-wrap text-xs md:w-full">
              {imageFileName}
            </span>
          )}
        </div>
        {errors.image && (
          <p className="text-sm text-red-500">
            {errors.image.message as string}
          </p>
        )}
      </div>
    </>
  );
};

export default ImageUploader;
