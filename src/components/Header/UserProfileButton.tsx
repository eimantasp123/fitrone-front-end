import AuthContext from "@/context/AuthContext";
import { useAppSelector } from "@/store";
import { capitalizeFirstLetter } from "@/utils/helper";
import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { FaQuestion } from "react-icons/fa6";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const UserProfileButton: React.FC = () => {
  const { t } = useTranslation("header");
  const { details: user } = useAppSelector((state) => state.personalDetails);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Capitalize the first letter of the user's name and surname
  const fullName = `${capitalizeFirstLetter(user.firstName || "")} ${capitalizeFirstLetter(
    user.lastName || "",
  )}`;

  return (
    <>
      <Menu isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        {/* Button with image */}
        <MenuButton
          sx={{
            bg: "transparent",
            _hover: {
              bg: "transparent",
            },
            _active: {
              bg: "transparent",
            },
          }}
          padding="24px 0px"
          w="100%"
          as={Button}
        >
          <div className="flex items-center justify-center gap-3">
            <img
              src={encodeURI(user?.profileImage || "")}
              alt="Profile"
              className="objet-top size-[32px] rounded-full object-cover lg:size-[33px]"
            />
            <div className="flex flex-col items-start">
              <div className="hidden whitespace-nowrap text-sm font-normal text-white transition-all duration-1000 ease-in-out lg:block">
                {`${fullName.length > 22 ? `${fullName.slice(0, 22)}...` : fullName}`}
              </div>
              <div className="hidden whitespace-nowrap text-xs font-normal text-white transition-all duration-1000 ease-in-out lg:block">
                {user.email && user.email.length > 22
                  ? `${user.email.slice(0, 22)}...`
                  : user.email}
              </div>
            </div>
          </div>
        </MenuButton>

        {/* Modal content */}

        <MenuList zIndex={50}>
          <MenuGroup title={t("profile")}>
            <MenuItem
              icon={<IoSettingsOutline />}
              onClick={() => navigate("/profile")}
            >
              {t("accountSettings")}
            </MenuItem>
            <MenuItem icon={<IoLogOutOutline />} onClick={logout}>
              {t("logout")}
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title={t("help")}>
            <MenuItem icon={<FaQuestion />} onClick={() => navigate("/faq")}>
              {t("faq")}
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </>
  );
};

export default UserProfileButton;
