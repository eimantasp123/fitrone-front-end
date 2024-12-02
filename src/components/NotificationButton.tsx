// import {
//   IconButton,
//   Menu,
//   MenuButton,
//   MenuDivider,
//   MenuList,
//   Tooltip,
//   useColorMode,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import { IoNotificationsOutline } from "react-icons/io5";
// import LinkButton from "./common/LinkButton";
// import NotificationCard from "./common/NotificationCard";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";

// const notifications = [
//   {
//     id: 1,
//     message: "Your workout plan has been updated.",
//     read: false,
//     time: "Jul 23, 2024 at 09:15 am",
//   },
//   {
//     id: 2,
//     message: "You’ve achieved a new fitness milestone!",
//     read: true,
//     time: "Jul 13, 2024 at 19:15 am",
//   },
//   {
//     id: 3,
//     message: "You’ve achieved a new fitness milestone!",
//     read: true,
//     time: "Jul 13, 2024 at 19:15 am",
//   },
//   // {
//   //   id: 4,
//   //   message: "Your workout plan has been updated.",
//   //   read: false,
//   //   time: "Jul 23, 2024 at 09:15 am",
//   // },
//   // {
//   //   id: 5,
//   //   message: "You’ve achieved a new fitness milestone!",
//   //   read: true,
//   //   time: "Jul 13, 2024 at 19:15 am",
//   // },
//   // {
//   //   id: 6,
//   //   message: "You’ve achieved a new fitness milestone!",
//   //   read: true,
//   //   time: "Jul 13, 2024 at 19:15 am",
//   // },
//   // {
//   //   id: 7,
//   //   message: "Your workout plan has been updated.",
//   //   read: false,
//   //   time: "Jul 23, 2024 at 09:15 am",
//   // },
//   // {
//   //   id: 8,
//   //   message: "You’ve achieved a new fitness milestone!",
//   //   read: true,
//   //   time: "Jul 13, 2024 at 19:15 am",
//   // },
//   // {
//   //   id: 9,
//   //   message: "You’ve achieved a new fitness milestone!",
//   //   read: true,
//   //   time: "Jul 13, 2024 at 19:15 am",
//   // },
// ];

// const NotificationButton = () => {
//   const { t } = useTranslation("header");
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [isTooltipOpen, setIsTooltipOpen] = useState(false);
//   const { colorMode } = useColorMode();
//   const navigate = useNavigate();

//   const handleMenuOpen = () => {
//     setIsTooltipOpen(false);
//     onOpen();
//   };

//   const handleMenuClose = () => {
//     onClose();
//   };

//   const markAllAsRead = () => {
//     console.log("Mark all as read");
//   };

//   const openNotifications = () => {
//     onClose();
//     navigate("/notifications");
//   };

//   return (
//     <div className="relative">
//       <Menu isOpen={isOpen} onClose={handleMenuClose}>
//         <Tooltip
//           closeOnClick={false}
//           isOpen={isTooltipOpen && !isOpen}
//           label={t("notifications")}
//         >
//           <MenuButton
//             as={IconButton}
//             onMouseEnter={() => setIsTooltipOpen(true)}
//             onMouseLeave={() => setIsTooltipOpen(false)}
//             onClick={handleMenuOpen}
//             isRound
//             size={"sm"}
//             variant="customIconButton"
//             icon={<IoNotificationsOutline />}
//           />
//         </Tooltip>
//         {notifications.length > 0 && (
//           <div className="absolute right-[2px] top-[2px] z-20 flex size-2 items-center justify-center rounded-full bg-primaryDark">
//             <div className="z-40 size-2 animate-ping rounded-full bg-primary" />
//           </div>
//         )}
//           <MenuList
//             borderRadius="xl"
//             w={{ base: "95vw", sm: "400px" }} // Full width (100vw) on mobile, 400px on larger screens
//             p={4}
//             boxShadow="lg"
//             zIndex={50}
//             position={{ base: "absolute", sm: "relative" }} // Fixed on mobile, absolute on desktop
//             right={{ base: "-104px", sm: "0px" }} // Aligns the menu list to the left edge on mobile // Aligns the menu list to the right edge on mobile
//           >
//             {/* Header */}
//             <div className="mb-4 flex items-center justify-between">
//               <h2 className="text-sm font-medium">{t("notifications")}</h2>
//               {notifications.length > 0 && (
//                 <LinkButton text={t("markAllAsRead")} onClick={markAllAsRead} />
//               )}
//             </div>

//             {/* Notification List */}
//             <div className="custom-scrollbar-select max-h-[450px] space-y-2 overflow-y-auto p-2">
//               {notifications.length > 0 ? (
//                 notifications.map((notification) => (
//                   <NotificationCard
//                     key={notification.id}
//                     notification={notification}
//                     colorMode={colorMode}
//                   />
//                 ))
//               ) : (
//                 <h2 className="text-center text-textSecondary">
//                   {t("notificationsEmpty")}
//                 </h2>
//               )}
//             </div>

//             {/* Divider */}
//             <MenuDivider />

//             {/* Footer */}
//             <div className="w-full text-center">
//               <LinkButton
//                 textSize="text-xs"
//                 text={t("viewAll")}
//                 onClick={openNotifications}
//               />
//             </div>
//           </MenuList>
//       </Menu>
//     </div>
//   );
// };

// export default NotificationButton;
