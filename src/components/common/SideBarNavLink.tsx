import { NavLink as RouterNavLink } from "react-router-dom";

interface SidebarNavLinkProps {
  to?: string;
  icon: React.ElementType;
  text: string | React.ReactNode;
  onClick?: () => void;
}

const SidebarNavLink: React.FC<SidebarNavLinkProps> = ({
  to = "/",
  icon: Icon,
  text,
  onClick,
}) => {
  return (
    <RouterNavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `group relative flex items-center gap-3 overflow-hidden py-3 pl-7 ${isActive ? "text-white" : "text-neutral-300"} outline-none transition-colors duration-300 ease-in-out`
      }
    >
      {({ isActive }) => (
        <div className="flex items-center gap-3">
          <Icon
            className={`mb-[-1px] text-lg transition-colors duration-300 ${
              isActive ? "text-primary" : "text-neutral-300"
            } group-hover:text-white`}
          />
          <span
            className={`text-sm transition-colors duration-300 ${
              isActive ? "" : ""
            } group-hover:text-white`}
          >
            {text}
          </span>
          <div
            className={`absolute left-0 h-8 w-[5px] rounded-br-2xl rounded-tr-2xl transition-colors duration-300 ease-in-out group-hover:bg-neutral-300 ${isActive ? "bg-primary" : "bg-transparent"}`}
          ></div>
        </div>
      )}
    </RouterNavLink>
  );
};

export default SidebarNavLink;
