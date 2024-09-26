import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa6";
import { TiArrowSortedUp } from "react-icons/ti";
import PropTypes from "prop-types";
import { useState } from "react";

export default function UserProfileButton({ user, handleLogout }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { colorMode } = useColorMode();

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  return (
    <>
      <Menu>
        {/* Button with image */}
        <MenuButton
          sx={{
            bg:
              colorMode === "dark"
                ? "dark.darkSecondary"
                : "light.backgroundSecondary",
            _hover: {
              bg: colorMode === "dark" ? "dark.dark" : "light.background",
            },
            _active: {
              bg: colorMode === "dark" ? "dark.dark" : "light.background",
            },
          }}
          padding="24px 10px"
          onClick={toggleModal}
          as={Button}
        >
          <div className="flex items-center justify-center gap-3">
            <img
              src={user?.profileImage}
              alt="Profile"
              className="size-[35px] rounded-full lg:size-[35px]"
            />
            <div className="hidden whitespace-nowrap text-sm font-normal transition-all duration-1000 ease-in-out xl:block">
              {user.email}
            </div>
            <TiArrowSortedUp
              className={`transition-transform duration-300 ease-in-out ${isModalOpen ? "-rotate-180" : ""}`}
            />
          </div>
        </MenuButton>

        {/* Modal content */}
        <MenuList>
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
      </Menu>
    </>
  );
}

UserProfileButton.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
