import { Tooltip, useColorMode } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import NotificationCard from "./common/NotificationCard";
import TextButton from "./common/TextButton";

const NotificationButton = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  const toggleDropdown = () => setOpen(!open);

  // Example notifications
  const notifications = [
    {
      id: 1,
      message: "Your workout plan has been updated.",
      read: false,
      time: "Jul 23, 2024 at 09:15 am",
    },
    {
      id: 2,
      message: "You’ve achieved a new fitness milestone!",
      read: true,
      time: "Jul 13, 2024 at 19:15 am",
    },
    // {
    //   id: 3,
    //   message: "Your subscription is expiring soon.",
    //   read: false,
    //   time: "Jul 23, 2024 at 09:15 am",
    // },
    // {
    //   id: 3,
    //   message: "Your subscription is expiring soon.",
    //   time: "Jul 3, 2024 at 09:45 am",
    //   read: true,
    // },
    // {
    //   id: 3,
    //   message: "Your subscription is expiring soon.",
    //   time: "Jul 23, 2024 at 09:15 am",
    //   read: true,
    // },
    // {
    //   id: 3,
    //   message: "Your subscription is expiring soon.",
    //   time: "Jul 23, 2024 at 09:15 am",
    //   read: false,
    // },
    // {
    //   id: 3,
    //   message: "Your subscription is expiring soon.",
    //   time: "Jul 23, 2024 at 09:15 am",
    //   read: false,
    // },
    // {
    //   id: 3,
    //   message: "Your subscription is expiring soon.",
    //   time: "Jul 23, 2024 at 09:15 am",
    //   read: true,
    // },
    // {
    //   id: 3,
    //   message: "Your subscription is expiring soon.",
    //   time: "Jul 23, 2024 at 09:15 am",
    //   read: true,
    // },
    // {
    //   id: 3,
    //   message: "Your subscription is expiring soon.",
    //   time: "Jul 23, 2024 at 09:15 am",
    //   read: false,
    // },
  ];

  // Close dropdown if clicking outside
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openNotifications = () => {
    setOpen(false);
    navigate("/notifications");
  };

  return (
    <div className="relative" ref={ref}>
      <Tooltip sx={{ fontSize: "14px" }} label="Notifications" fontSize="md">
        <div
          onClick={toggleDropdown}
          className="border-border relative flex size-[35px] cursor-pointer items-center justify-center rounded-full border bg-background transition-colors duration-200 ease-in-out"
        >
          <IoNotificationsOutline className="text-md text-textPrimary" />
          {notifications.length > 0 ? (
            <div className="absolute right-[0px] top-[-0px] z-20 flex size-2 items-center justify-center rounded-full bg-primaryDark">
              <div className="z-40 size-2 animate-ping rounded-full bg-primary" />
            </div>
          ) : (
            ""
          )}
        </div>
      </Tooltip>

      {open && (
        <div className="absolute right-[-40px] z-50 mt-2 w-[300px] rounded-2xl border bg-background shadow-lg sm:right-[-10px] sm:w-[450px] md:-right-2">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Notifications</h4>
              {notifications.length > 0 ? (
                <TextButton
                  text="Mark all as read"
                  className="bg-transparent px-0 hover:bg-transparent hover:text-textSecondary"
                />
              ) : (
                ""
              )}
            </div>
            <ul className="mt-4 max-h-[500px] space-y-2 overflow-y-auto scrollbar-thin scrollbar-track-backgroundSecondary scrollbar-thumb-neutral-400">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <NotificationCard
                    page={false}
                    notification={notification}
                    key={notification.id}
                    colorMode={colorMode}
                  />
                ))
              ) : (
                <li className="text-textSecondary">No new notifications</li>
              )}
            </ul>
            <hr className="my-5 w-full border-t-[1px] border-borderColor outline-none" />
            <TextButton
              text="View all notifications"
              onClick={openNotifications}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
