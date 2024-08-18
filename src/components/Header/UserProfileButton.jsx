import { Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa6";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import PropTypes from "prop-types";
import { useState } from "react";

export default function UserProfileButton({ user, handleLogout }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  return (
    <>
      <Menu>
        <MenuButton
          padding="24px 10px"
          _hover={{ bg: "#e9e9e9" }}
          _active={{ bg: "#e9e9e9" }}
          onClick={toggleModal}
          bg={"transparent"}
          as={Button}
        >
          <div className="flex gap-3 justify-center  items-center">
            <img src={user?.profileImage} alt="Profile" className="lg:size-[35px] size-[35px] rounded-full " />
            <div className="hidden transition-all duration-1000 ease-in-out font-normal  text-sm xl:block  whitespace-nowrap">
              {user.email}
            </div>
            {isModalOpen ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
          </div>
        </MenuButton>
        <MenuList>
          <MenuGroup title="Profile">
            <MenuItem
              icon={<IoSettingsOutline />}
              _expanded={{ bg: "trasparent" }}
              _hover={{ bg: "#c5c5c53e" }}
              bg={"transparent"}
              onClick={() => navigate("/profile")}
            >
              Account Settings
            </MenuItem>
            <MenuItem icon={<IoLogOutOutline />} _hover={{ bg: "#c5c5c53e" }} onClick={handleLogout}>
              Logout
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="Help">
            <MenuItem
              icon={<FaQuestion />}
              _expanded={{ bg: "trasparent" }}
              _hover={{ bg: "#c5c5c53e" }}
              bg={"transparent"}
              onClick={() => navigate("/help")}
            >
              Faq
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
