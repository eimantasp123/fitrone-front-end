import { useColorMode } from "@chakra-ui/react";
import NotificationCard from "../../../components/common/NotificationCard";
import TextButton from "../../../components/common/TextButton";

const notifications = [
  {
    id: 1,
    message: "Your workout plan has been updated.",
    read: false,
    time: "Jul 23, 2024 at 09:15 am",
  },
  {
    id: 2,
    message: "Your subscription is expiring soon.",
    read: true,
    time: "Jul 22, 2024 at 09:15 am",
  },
  {
    id: 1,
    message: "Your workout plan has been updated.",
    read: false,
    time: "Jul 23, 2024 at 09:15 am",
  },
  {
    id: 2,
    message: "Your subscription is expiring soon.",
    read: true,
    time: "Jul 22, 2024 at 09:15 am",
  },
  {
    id: 1,
    message: "Your workout plan has been updated.",
    read: false,
    time: "Jul 23, 2024 at 09:15 am",
  },
  {
    id: 2,
    message: "Your subscription is expiring soon.",
    read: true,
    time: "Jul 22, 2024 at 09:15 am",
  },
  {
    id: 1,
    message: "Your workout plan has been updated.",
    read: false,
    time: "Jul 23, 2024 at 09:15 am",
  },
  {
    id: 2,
    message: "Your subscription is expiring soon.",
    read: true,
    time: "Jul 22, 2024 at 09:15 am",
  },
  {
    id: 1,
    message: "Your workout plan has been updated.",
    read: false,
    time: "Jul 23, 2024 at 09:15 am",
  },
  {
    id: 2,
    message: "Your subscription is expiring soon.",
    read: true,
    time: "Jul 22, 2024 at 09:15 am",
  },
  {
    id: 1,
    message: "Your workout plan has been updated.",
    read: false,
    time: "Jul 23, 2024 at 09:15 am",
  },
  {
    id: 2,
    message: "Your subscription is expiring soon.",
    read: true,
    time: "Jul 22, 2024 at 09:15 am",
  },
  {
    id: 1,
    message: "Your workout plan has been updated.",
    read: false,
    time: "Jul 23, 2024 at 09:15 am",
  },
  {
    id: 2,
    message: "Your subscription is expiring soon.",
    read: true,
    time: "Jul 22, 2024 at 09:15 am",
  },
  {
    id: 1,
    message: "Your workout plan has been updated.",
    read: false,
    time: "Jul 23, 2024 at 09:15 am",
  },
  {
    id: 2,
    message: "Your subscription is expiring soon.",
    read: true,
    time: "Jul 22, 2024 at 09:15 am",
  },
  {
    id: 1,
    message: "Your workout plan has been updated.",
    read: false,
    time: "Jul 23, 2024 at 09:15 am",
  },
  {
    id: 2,
    message: "Your subscription is expiring soon.",
    read: true,
    time: "Jul 22, 2024 at 09:15 am",
  },
  {
    id: 1,
    message: "Your workout plan has been updated.",
    read: false,
    time: "Jul 23, 2024 at 09:15 am",
  },
  {
    id: 2,
    message: "Your subscription is expiring soon.",
    read: true,
    time: "Jul 22, 2024 at 09:15 am",
  },
];

export default function GeneralNotifications() {
  const { colorMode } = useColorMode();
  return (
    <div className="mb-32 w-full p-6 md:mb-40 md:px-14 md:pt-10">
      <div className="container mx-auto h-full w-full max-w-[1400px]">
        <div className="flex flex-col items-start justify-between xl:flex-row xl:items-center">
          <div className="xl:w-[70%]">
            <h1 className="text-xl font-semibold text-textPrimary">
              Stay Informed with Real-Time Notifications
            </h1>
            <p className="mb-4 mt-2 text-textSecondary">
              Never miss a beat! Our notification system keeps you updated with
              personalized insights, reminders, and real-time alerts that help
              you stay on track with your goals.
            </p>
          </div>
          <TextButton
            text="Mark all as read"
            className="border border-borderPrimary xl:w-[17%] 2xl:w-[13%] 3xl:w-[12%]"
          />
        </div>
        <div className="my-8 flex h-full w-full flex-col gap-3 overflow-y-auto pr-5 scrollbar-thin scrollbar-track-backgroundSecondary scrollbar-thumb-neutral-400">
          {notifications.map((notification, index) => (
            <NotificationCard
              page={true}
              key={index}
              notification={notification}
              index={index}
              colorMode={colorMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
