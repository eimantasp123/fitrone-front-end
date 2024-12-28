import { createStandaloneToast } from "@chakra-ui/react";
import {
  IoCheckmarkCircle,
  IoCloseCircle,
  IoInformationCircle,
  IoWarning,
} from "react-icons/io5";
import { MdClose } from "react-icons/md";

// Create standalone toast instance
const { toast } = createStandaloneToast();
let currentToastId: string | number | undefined;

// Custom toast function
export const showCustomToast = ({
  status,
  title,
  description,
}: {
  status: "success" | "error" | "warning" | "info";
  title?: string | null;
  description?: string | null;
}) => {
  // Close the current toast if one is already being shown
  if (currentToastId !== undefined) {
    toast.close(currentToastId);
  }

  // Show the custom toast
  currentToastId = toast({
    position: "bottom",
    duration: ["info", "warning"].includes(status) ? 10000 : 4000,
    isClosable: true,
    render: ({ id, onClose }) => (
      <div
        key={id}
        className={`${getToastStyle(status).bg} ${getToastStyle(status).border} ${
          getToastStyle(status).textColor
        } flex w-full gap-3 rounded-lg border-[1px] p-3 shadow-custom-light lg:w-[400px]`}
      >
        <div className="ml-2 flex w-[10%] items-center text-xl">
          {getToastStyle(status).icon}
        </div>
        <div className="flex w-[80%] flex-col">
          <h2 className="text-sm font-medium">{title}</h2>
          {description && <p className="text-sm">{description}</p>}
        </div>
        <div
          className="flex w-[10%] cursor-pointer justify-end text-xl"
          onClick={onClose}
        >
          <MdClose />
        </div>
      </div>
    ),
  });
};

// Get toast style based on status
const getToastStyle = (status: "success" | "error" | "warning" | "info") => {
  switch (status) {
    case "success":
      return {
        bg: "bg-primaryLight dark:bg-primary",
        border: "border-transparent",
        textColor: "text-black",
        icon: <IoCheckmarkCircle className="text-black" />,
      };
    case "error":
      return {
        bg: "bg-red-500",
        border: "border-transparent",
        textColor: "text-white",
        icon: <IoCloseCircle className="text-white" />,
      };
    case "warning":
      return {
        bg: "bg-yellow-400",
        border: "border-transparent",
        textColor: "text-black",
        icon: <IoWarning className="text-black" />,
      };
    case "info":
      return {
        bg: "bg-blue-200",
        border: "border-transparent",
        textColor: "text-black",
        icon: <IoInformationCircle className="text-black" />,
      };
    default:
      return {
        bg: "bg-white",
        textColor: "text-black",
        icon: null,
      };
  }
};
