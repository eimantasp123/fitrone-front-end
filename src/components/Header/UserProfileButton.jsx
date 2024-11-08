import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Portal,
  useDisclosure,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { FaQuestion } from "react-icons/fa6";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function UserProfileButton({ user, handleLogout }) {
  const { t } = useTranslation("header");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  return (
    <>
      <Menu isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        {/* Button with image */}
        <MenuButton
          variant="ghost"
          // sx={{
          //   bg: colorMode === "dark" ? "dark.dark" : "light.background",
          //   _hover: {
          //     bg:
          //       colorMode === "dark"
          //         ? "dark.darkSecondary"
          //         : "light.backgroundSecondary",
          //   },
          //   _active: {
          //     bg:
          //       colorMode === "dark"
          //         ? "dark.darkSecondary"
          //         : "light.backgroundSecondary",
          //   },
          // }}
          padding="24px 10px"
          as={Button}
        >
          <div className="flex items-center justify-center gap-3">
            <img
              src={user?.profileImage}
              alt="Profile"
              className="objet-top size-[38px] rounded-full object-cover lg:size-[33px]"
            />
            {/* <div className="hidden whitespace-nowrap text-sm font-normal transition-all duration-1000 ease-in-out xl:block">
              {user.email}
            </div>
            <TiArrowSortedUp
              className={`hidden transition-transform duration-300 ease-in-out sm:block ${isOpen ? "-rotate-180" : ""}`}
            /> */}
          </div>
        </MenuButton>

        {/* Modal content */}
        <Portal>
          <MenuList zIndex={50}>
            <MenuGroup title={t("profile")}>
              <MenuItem
                icon={<IoSettingsOutline />}
                onClick={() => navigate("/profile")}
              >
                {t("accountSettings")}
              </MenuItem>
              <MenuItem icon={<IoLogOutOutline />} onClick={handleLogout}>
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
        </Portal>
      </Menu>
    </>
  );
}

UserProfileButton.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
