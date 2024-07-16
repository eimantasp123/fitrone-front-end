import PropTypes from "prop-types";
import {
  MdCardMembership,
  MdManageAccounts,
  MdDeleteForever,
  MdOutlinePassword,
  MdOutlinePayments,
  MdOutlineSecurity,
} from "react-icons/md";
import NavItem from "../common/NavItem";

const Sidebar = ({ user }) => {
  const navLinks = [
    { to: "edit", icon: MdManageAccounts, label: "My Details" },
    { to: "change-password", icon: MdOutlinePassword, label: "Password" },
    { to: "two-factor-auth", icon: MdOutlineSecurity, label: "Profile security" },
    { to: "manage-subscription", icon: MdCardMembership, label: "Subscription" },
    { to: "payment-methods", icon: MdOutlinePayments, label: "Payment methods" },
  ];

  return (
    <div className="flex flex-col pl-6 w-[20%] mt-10">
      <h2 className="text-[22px] font-bold">
        {user.firstName} {user.lastName}
      </h2>
      <p className="text-gray-600">{user.email}</p>
      <ul className="w-full flex flex-col gap-2 mt-8">
        {navLinks.map((link) => (
          <NavItem key={link.to} to={link.to} icon={link.icon} label={link.label} />
        ))}
        <NavItem to="logout" icon={MdDeleteForever} label="Delete Account" />
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Sidebar;
