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

export const showCustomToast = ({
  status,
  title,
  description,
}: {
  status: "success" | "error" | "warning" | "info";
  title: string;
  description?: string;
}) => {
  // Close the current toast if one is already being shown
  if (currentToastId !== undefined) {
    toast.close(currentToastId);
  }

  // Show the custom toast
  currentToastId = toast({
    position: "bottom",
    duration: 4000,
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

const getToastStyle = (status: "success" | "error" | "warning" | "info") => {
  switch (status) {
    case "success":
      return {
        bg: "bg-[#f0faf0]",
        border: "border-green-500/40",
        textColor: "text-black",
        icon: <IoCheckmarkCircle className="text-green-500" />,
      };
    case "error":
      return {
        bg: "bg-[#fceded]",
        border: "border-red-500/40",
        textColor: "text-black",
        icon: <IoCloseCircle className="text-red-500" />,
      };
    case "warning":
      return {
        bg: "bg-[#FDF0E6]",
        border: "border-yellow-500/40",
        textColor: "text-black",
        icon: <IoWarning className="text-yellow-500" />,
      };
    case "info":
      return {
        bg: "bg-[#eaeff8]",
        border: "border-blue-500/40",
        textColor: "text-black",
        icon: <IoInformationCircle className="text-blue-400" />,
      };
    default:
      return {
        bg: "bg-white",
        textColor: "text-black",
        icon: null,
      };
  }
};
