import CustomerStatusBadge from "@/components/common/CustomerStatusBadge";
import {
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { TFunction } from "i18next";
import React from "react";
import {
  HiDotsVertical,
  HiOutlineReply,
  HiOutlineTrash,
  HiOutlineUserCircle,
} from "react-icons/hi";

interface CustomerCardProps {
  client: {
    firstName: string;
    lastName?: string;
    email: string;
    phone?: string | null;
    status: string;
    gender?: string | null;
  };
  t: TFunction;
  setActionModal: ({
    type,
    customerId,
  }: {
    type: "delete" | "resend";
    customerId: string;
  }) => void;
}

/**
 * Customer card component for the supplier customers page
 * @param client  The client object
 * @returns
 */
const CustomerCard: React.FC<CustomerCardProps> = ({
  client,
  t,
  setActionModal,
}) => {
  const genderOptions = t("gender", { returnObjects: true }) as {
    key: string;
    title: string;
  }[];

  return (
    <div className="grid w-full grid-cols-6 gap-2 rounded-lg bg-background p-4 text-sm shadow-custom-light4 dark:bg-backgroundSecondary xl:grid-cols-[minmax(250px,_350px)_minmax(250px,_350px)_minmax(150px,_250px)_minmax(100px,_1fr)_minmax(100px,_1fr)_50px]">
      {/* Avatar + Name */}
      <div className="col-span-6 flex items-center gap-3 sm:col-span-3 xl:col-auto">
        <Avatar
          size="sm"
          color="black"
          bgColor="#c5e280"
          name={`${client.firstName} ${client?.lastName ?? ""}`}
        />
        <p>{`${client.firstName} ${client?.lastName ?? ""}`}</p>
      </div>

      {/* Email Section */}
      <div className="col-span-6 flex items-center sm:col-span-3 xl:col-auto">
        <h6 className="pr-2 font-semibold xl:hidden">{t("email")}:</h6>
        <h6>{client.email}</h6>
      </div>

      {/* Phone Number */}
      <div className="col-span-6 flex items-center sm:col-span-3 xl:col-auto">
        <h6 className="pr-2 font-semibold xl:hidden">{t("phoneNumber")}:</h6>
        <h6>{client?.phone ?? t("notProvided")}</h6>
      </div>

      {/* Gender */}
      <div className="col-span-6 flex items-center sm:col-span-3 xl:col-auto">
        <h6 className="pr-2 font-semibold xl:hidden">{t("genderTitle")}:</h6>
        <h6>
          {client.gender
            ? genderOptions.find((option) => option.key === client.gender)
                ?.title
            : t("notProvided")}
        </h6>
      </div>

      {/* Customer Status */}
      <div className="col-span-3 flex items-center xl:col-auto">
        <h6 className="pr-2 font-semibold xl:hidden">{t("statusTitle")}:</h6>
        <CustomerStatusBadge status={client.status} />
      </div>

      {/* Menu Button */}
      <div className="col-span-3 flex items-center justify-end xl:col-auto">
        <Menu placement="bottom-end">
          <MenuButton
            as={IconButton}
            icon={<HiDotsVertical />}
            rounded={"full"}
            size="sm"
          />
          <MenuList minWidth="200px" zIndex={1}>
            <MenuItem icon={<HiOutlineUserCircle className="text-[15px]" />}>
              {t("moreDetails")}
            </MenuItem>
            {client.status === "pending" && (
              <MenuItem
                onClick={() =>
                  setActionModal({ type: "resend", customerId: client.email })
                }
                icon={<HiOutlineReply className="text-[15px]" />}
              >
                {t("resendForm")}
              </MenuItem>
            )}
            <MenuItem
              color="red.500"
              onClick={() =>
                setActionModal({ type: "delete", customerId: client.email })
              }
              icon={<HiOutlineTrash className="text-[15px]" />}
            >
              {t("common:delete")}
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default CustomerCard;
