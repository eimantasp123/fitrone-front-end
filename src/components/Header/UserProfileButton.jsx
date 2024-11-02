import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Portal,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { FaQuestion } from "react-icons/fa6";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { TiArrowSortedUp } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

export default function UserProfileButton({ user, handleLogout }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  return (
    <>
      <Menu isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        {/* Button with image */}
        <MenuButton
          sx={{
            bg: colorMode === "dark" ? "dark.dark" : "light.background",
            _hover: {
              bg:
                colorMode === "dark"
                  ? "dark.darkSecondary"
                  : "light.backgroundSecondary",
            },
            _active: {
              bg:
                colorMode === "dark"
                  ? "dark.darkSecondary"
                  : "light.backgroundSecondary",
            },
          }}
          padding="24px 10px"
          as={Button}
        >
          <div className="flex items-center justify-center gap-3">
            <img
              src={user?.profileImage}
              alt="Profile"
              className="objet-top size-[38px] rounded-full object-cover lg:size-[38px]"
            />
            <div className="hidden whitespace-nowrap text-sm font-normal transition-all duration-1000 ease-in-out xl:block">
              {user.email}
            </div>
            <TiArrowSortedUp
              className={`hidden transition-transform duration-500 ease-in-out sm:block ${isOpen ? "-rotate-180" : ""}`}
            />
          </div>
        </MenuButton>

        {/* Modal content */}
        <Portal>
          <MenuList zIndex={50}>
            <MenuGroup title="Profile">
              <MenuItem
                icon={<IoSettingsOutline />}
                onClick={() => navigate("/profile")}
              >
                Account Settings
              </MenuItem>
              <MenuItem icon={<IoLogOutOutline />} onClick={handleLogout}>
                Logout
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Help">
              <MenuItem icon={<FaQuestion />} onClick={() => navigate("/faq")}>
                FAQ
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
