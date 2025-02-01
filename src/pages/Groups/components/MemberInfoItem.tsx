import useFiltersOptions from "@/hooks/useFiltersOptions";
import { capitalizeFirstLetter } from "@/utils/helper";
import { CustomerEditForm } from "@/utils/types";
import {
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tooltip,
} from "@chakra-ui/react";
import { TFunction } from "i18next";
import { FaTrash } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";

/**
 * Member item component for group management
 */
const MemberInfoItem = ({
  member,
  t,
  setModalState,
}: {
  member: CustomerEditForm;
  t: TFunction;
  setModalState: React.Dispatch<
    React.SetStateAction<{
      type: "deleteCustomer" | "deleteGroup";
      id: string;
    } | null>
  >;
}) => {
  const {
    dietaryPreferences,
    dietaryRestrictions,
    genderOptions,
    physicalActivityLevelOptions,
    fitnessGoalOptionsTranslated,
  } = useFiltersOptions();

  // Memoize translated values to avoid unnecessary `.find()` calls in every render
  const genderTitle =
    genderOptions.find((opt) => opt.key === member.gender)?.title ||
    t("notSettled");

  const fitnessGoalTitle =
    fitnessGoalOptionsTranslated.find((opt) => opt.key === member.fitnessGoal)
      ?.title || t("notSettled");

  const physicalActivityTitle =
    physicalActivityLevelOptions.find(
      (opt) => opt.key === member.physicalActivityLevel,
    )?.title || t("notSettled");

  return (
    <div className="grid-rows-auto grid grid-cols-[1fr_35px] items-center gap-1 rounded-lg bg-backgroundSecondary p-3 text-sm dark:bg-background 2xl:grid-cols-[minmax(250px,_1fr)_minmax(250px,_300px)_minmax(250px,_300px)_50px] 2xl:gap-8">
      {/* Member Name + Info */}
      <div className="flex items-center gap-1">
        <p>
          {capitalizeFirstLetter(member.firstName)}{" "}
          {capitalizeFirstLetter(member.lastName)}
        </p>
        <Popover>
          <PopoverTrigger>
            <button className="text-md cursor-pointer pl-2 text-primary">
              <FaCircleInfo />
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverCloseButton />
            <PopoverHeader>{t("infoAboutCustomer")}:</PopoverHeader>
            <PopoverBody>
              <div className="flex flex-col gap-2 text-xs">
                <div>
                  <span className="font-semibold">
                    {t("common:firstName")}:
                  </span>{" "}
                  {capitalizeFirstLetter(member.firstName)}
                </div>
                <div>
                  <span className="font-semibold">{t("common:lastName")}:</span>{" "}
                  {capitalizeFirstLetter(member.lastName)}
                </div>
                <div>
                  <span className="font-semibold">{t("common:age")}:</span>{" "}
                  {member.age}
                </div>
                <div>
                  <span className="font-semibold">
                    {t("customers:genderTitle")}:
                  </span>{" "}
                  {genderTitle}
                </div>
                <div>
                  <span className="font-semibold">{t("common:height")}:</span>{" "}
                  {member.height}
                </div>
                <div>
                  <span className="font-semibold">{t("common:weight")}:</span>{" "}
                  {member.weight}
                </div>
                <div>
                  <span className="font-semibold">
                    {t("common:fitnessGoal")}:
                  </span>{" "}
                  {fitnessGoalTitle}
                </div>
                <div>
                  <span className="font-semibold">
                    {t("common:weightGoal")}:
                  </span>{" "}
                  {member.weightGoal}
                </div>
                <div>
                  <span className="font-semibold">
                    {t("common:physicalActivityLevel")}:
                  </span>{" "}
                  {physicalActivityTitle}
                </div>

                {/* Dietary Preferences */}
                {member.preferences.length > 0 && (
                  <div className="flex flex-col items-start gap-1">
                    <p className="font-semibold">{t("dietaryPreferences")}: </p>
                    <div className="flex flex-wrap gap-2">
                      {member.preferences.map((option) => (
                        <span
                          key={option}
                          className="rounded-full bg-backgroundLight px-[10px] py-[2px] dark:bg-neutral-800"
                        >
                          {dietaryPreferences.find(
                            (item) => item.key === option,
                          )?.title || option}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dietary Restrictions */}
                {member.restrictions && member.restrictions?.length > 0 && (
                  <div className="flex flex-col items-start gap-1">
                    <p className="font-semibold">{t("dietaryRestrictions")}</p>
                    <div className="flex flex-wrap gap-2">
                      {member.restrictions.map((option) => (
                        <span
                          key={option}
                          className="rounded-full bg-backgroundLight px-[10px] py-[2px] dark:bg-neutral-800"
                        >
                          {dietaryRestrictions.find(
                            (item) => item.key === option,
                          )?.title || option}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>

      {/* Email and Phone */}
      <div className="col-span-2 flex items-center gap-2 2xl:col-auto 2xl:flex-col 2xl:items-start 2xl:gap-0">
        <span className="text-nowrap text-sm 2xl:text-xs">
          {t("common:email")}:
        </span>
        <p className="max-w-full overflow-hidden break-words">{member.email}</p>
      </div>
      <div className="col-span-2 flex items-center gap-2 2xl:col-auto 2xl:flex-col 2xl:items-start 2xl:gap-0">
        <span className="text-nowrap text-sm 2xl:text-xs">
          {t("common:phoneNumber")}:
        </span>{" "}
        <p className="max-w-full overflow-hidden break-words">{member.phone}</p>
      </div>

      <div className="col-start-2 row-start-1 2xl:col-auto 2xl:row-auto">
        {/* Remove Button */}
        <Tooltip label={t("removeMember")} aria-label={t("removeMember")}>
          <button
            onClick={() =>
              setModalState({ type: "deleteCustomer", id: member._id })
            }
            className="rounded-lg p-3 text-xs text-red-500 hover:bg-red-100 dark:hover:bg-red-800/20"
          >
            <FaTrash />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default MemberInfoItem;
