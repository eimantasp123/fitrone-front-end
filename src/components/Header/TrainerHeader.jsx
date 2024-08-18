import { useContext, useEffect, useState } from "react";
import SearchInput from "../SearchInput";
import { formatDate } from "../../utils/formatDate";
import authContext from "../../context/AuthContext";
import { MdSearch } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { BiSupport } from "react-icons/bi";
import UserProfileButton from "./UserProfileButton";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Box,
  Badge,
  Flex,
  Text,
} from "@chakra-ui/react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useSelector } from "react-redux";

export default function UserHeader() {
  const [todayDate, setTodayDate] = useState("");
  const { details: user } = useSelector((state) => state.personalDetails);
  const { logout } = useContext(authContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isNotificationsOpen, onOpen: onNotificationsOpen, onClose: onNotificationsClose } = useDisclosure();

  useEffect(() => {
    const today = new Date();
    setTodayDate(formatDate(today));
  }, []);

  const { execute: executeLogout } = logout;

  const handleLogout = async () => {
    try {
      await executeLogout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const notifications = [
    {
      icon: <IoIosNotificationsOutline />,
      message: "Your Security Password has been successfully changed.",
      time: "10 minutes ago",
    },
    {
      icon: <IoIosNotificationsOutline />,
      message: "32+ 3D icons have been added in the artificial intelligence category.",
      time: "Today 7:12 am",
    },
    {
      icon: <IoIosNotificationsOutline />,
      message: "A new version of the software has been added that has changed the UI/UX.",
      time: "Thursday 2:20 pm",
    },
    {
      icon: <IoIosNotificationsOutline />,
      message: "120+ animated icons have been added in the technology category.",
      time: "Wednesday 9:31 pm",
    },
    {
      icon: <IoIosNotificationsOutline />,
      message: "Your icon request has been successfully completed and you will be notified as soon as it is ready.",
      time: "Friday 11:39 pm",
    },
  ];

  return (
    <header className="flex min-h-20 px-2 md:px-8 border-b-[1px] md:bg-background border-gray-200 md:justify-between items-center gap-10">
      {/* Welcome Text */}
      <div className="w-[20%] hidden whitespace-nowrap md:block min-h-[40px]">
        Welcome, <span className="font-medium">{user.firstName}</span>
        <div className="text-[14px]">{todayDate}</div>
      </div>

      {/* Logo in Center */}
      <div className="w-full pl-4 md:hidden">
        <span className="font-bold text-xl text-secondary">LOGO</span>
      </div>

      {/* Search Input for Medium and Larger Screens */}
      <SearchInput className="flex-grow hidden md:block" />

      <div className="flex items-center gap-5">
        {/* Notifications Icon with Menu */}
        <Menu isOpen={isNotificationsOpen} onClose={onNotificationsClose}>
          <MenuButton
            as={Box}
            position="relative"
            display="flex"
            alignItems="center"
            cursor={"pointer"}
            justifyContent="center"
            onClick={onNotificationsOpen}
          >
            <IconButton icon={<IoIosNotificationsOutline className="text-xl" />} variant="ghost" />
            <Badge
              variant="solid"
              colorScheme="red"
              position="absolute"
              top="8px"
              right="8px"
              fontSize="0.6em"
              borderRadius="full"
              width="18px"
              height="18px"
              display="flex"
              alignItems="center"
              userSelect={"none"}
              justifyContent="center"
              transform="translate(50%, -50%)"
            >
              10
            </Badge>
          </MenuButton>
          <MenuList maxWidth="400px" padding="4" borderRadius="lg">
            <Text fontSize="md" userSelect={"none"} fontWeight="bold" mb="4">
              Notifications
            </Text>
            {notifications.map((notification, index) => (
              <MenuItem
                key={index}
                padding="3"
                borderRadius="md"
                _active={{ background: "#eeeeee" }}
                _hover={{ background: "#eeeeee" }}
                bg={"transparent"}
              >
                <Flex direction="row" alignItems="center">
                  <Box marginRight="4" fontSize="xl">
                    {notification.icon}
                  </Box>
                  <Box>
                    <Text fontSize="sm">{notification.message}</Text>
                    <Text fontSize="xs" color="gray.500">
                      {notification.time}
                    </Text>
                  </Box>
                </Flex>
              </MenuItem>
            ))}
            <MenuItem
              mt="4"
              justifyContent="center"
              _active={{ background: "#eeeeee" }}
              _hover={{ background: "#eeeeee" }}
              bg={"transparent"}
              fontSize="sm"
              color="black"
              rounded={"lg"}
            >
              View All Notifications
            </MenuItem>
          </MenuList>
        </Menu>

        {/* Help center button */}
        <NavLink to="/help" className="text-sm hidden cursor-pointer lg:flex items-center gap-2">
          <span className="text-base align-middle">
            <BiSupport />
          </span>
          <h2 className="whitespace-nowrap select-none">Help Center</h2>
        </NavLink>

        {/* Search Icon for Small Screens */}
        <div onClick={onOpen} className="flex w-full justify-center max-w-[25%] min-w-[50px] md:hidden">
          <MdSearch className="text-secondary text-2xl cursor-pointer" />
        </div>

        {/* Search Drawer */}
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent
            sx={{
              maxWidth: "100vw",
              boxSizing: "border-box",
            }}
            bg="#F7F7F8"
          >
            <DrawerCloseButton />
            <DrawerBody className="mt-12 mb-5">
              <SearchInput />
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        {/* User Profile */}
        <UserProfileButton user={user} handleLogout={handleLogout} />
      </div>
    </header>
  );
}
