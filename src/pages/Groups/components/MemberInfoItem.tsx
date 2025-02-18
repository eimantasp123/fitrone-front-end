import MemberShortIngoPopover from "@/components/common/MemberShortIngoPopover";
import { capitalizeFirstLetter } from "@/utils/helper";
import { CustomerEditForm } from "@/utils/types";
import { Tooltip } from "@chakra-ui/react";
import { TFunction } from "i18next";
import { FaTrash } from "react-icons/fa";

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
  return (
    <div className="grid-rows-auto grid grid-cols-[1fr_35px] items-center gap-1 rounded-lg bg-backgroundSecondary p-3 text-sm dark:bg-background 2xl:grid-cols-[minmax(250px,_1fr)_minmax(250px,_300px)_minmax(250px,_300px)_50px] 2xl:gap-8">
      {/* Member Name + Info */}
      <div className="flex items-center gap-1">
        <p>
          {capitalizeFirstLetter(member.firstName)}{" "}
          {capitalizeFirstLetter(member.lastName)}
        </p>
        <MemberShortIngoPopover member={member} />
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
