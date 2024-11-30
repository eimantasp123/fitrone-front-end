// import PropTypes from "prop-types";
// import {
//   IoNotificationsCircleSharp,
//   IoNotificationsOffCircle,
// } from "react-icons/io5";

// export default function NotificationCard({
//   notification,
//   index,
//   colorMode,
//   page = false,
// }) {
//   return (
//     <li
//       key={index}
//       className={`relative flex cursor-pointer items-center justify-between gap-4 rounded-xl ${notification.read ? `${page ? "bg-backgroundSecondary" : "bg-background"}` : `${page ? "bg-background" : "bg-backgroundSecondary"}`} py-3 pl-8 pr-3 transition-colors ${colorMode === "dark" ? `${notification.read ? "" : "hover:bg-neutral-800"}` : `${notification.read ? "" : "hover:bg-neutral-200"}`} duration-200 ease-out`}
//     >
//       <div className="w-[90%]">
//         <h6 className="text-sm font-medium leading-snug text-textPrimary">
//           {notification.message}
//         </h6>
//         <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
//           {notification.read
//             ? `${notification.time} | Read`
//             : `${notification.time} | Unread`}
//         </span>
//       </div>
//       {notification.read ? (
//         <IoNotificationsOffCircle className="w-[10%] text-2xl text-neutral-500" />
//       ) : (
//         <IoNotificationsCircleSharp className="w-[10%] text-2xl text-primaryDark" />
//       )}
//       <span
//         className={`absolute left-3 top-4 size-[9px] rounded-full ${notification.read ? "bg-neutral-500" : "bg-primary"}`}
//       />
//     </li>
//   );
// }

// NotificationCard.propTypes = {
//   notification: PropTypes.object.isRequired,
//   index: PropTypes.number,
//   colorMode: PropTypes.string,
//   page: PropTypes.bool,
// };
