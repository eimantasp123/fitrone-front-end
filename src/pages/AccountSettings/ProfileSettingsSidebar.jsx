import {
  MdManageAccounts,
  MdOutlinePassword,
  MdOutlinePayments,
  MdOutlineSecurity,
} from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";

import NavItem from "../../components/common/NavItem";

const Sidebar = () => {
  const navLinks = [
    { to: "edit", icon: MdManageAccounts, label: "My Profile" },
    { to: "change-password", icon: MdOutlinePassword, label: "Password" },
    {
      to: "two-factor-auth",
      icon: MdOutlineSecurity,
      label: "Profile security",
    },
    {
      to: "payment-methods",
      icon: MdOutlinePayments,
      label: "Payment methods",
    },
    { to: "delete-account", icon: IoTrashOutline, label: "Delete Account" },
  ];

  return (
    <div className="flex flex-col">
      <ul className="flex w-full flex-col gap-2 sm:grid sm:grid-cols-3 sm:gap-4 xl:flex xl:flex-col xl:gap-2">
        {navLinks.map((link) => (
          <NavItem
            key={link.to}
            to={link.to}
            icon={link.icon}
            label={link.label}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
