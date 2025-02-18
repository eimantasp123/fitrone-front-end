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
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaCircleInfo } from "react-icons/fa6";

interface Props {
  member: CustomerEditForm;
}

/**
 *  Customer short info popover component
 */
const MemberShortIngoPopover: React.FC<Props> = ({ member }) => {
  const { t } = useTranslation(["groups", "common"]);
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
    <>
      <Popover>
        <PopoverTrigger>
          <button className="cursor-pointer pl-2 text-[16px] text-primary">
            <FaCircleInfo />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverCloseButton />
          <PopoverHeader>{t("infoAboutCustomer")}:</PopoverHeader>
          <PopoverBody>
            <div className="flex flex-col gap-2 text-xs">
              <div>
                <span className="font-semibold">{t("common:firstName")}:</span>{" "}
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
                <span className="font-semibold">{t("common:weightGoal")}:</span>{" "}
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
                        {dietaryPreferences.find((item) => item.key === option)
                          ?.title || option}
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
                        {dietaryRestrictions.find((item) => item.key === option)
                          ?.title || option}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default MemberShortIngoPopover;
