import { createStandaloneToast, Spinner } from "@chakra-ui/react";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { MdClose } from "react-icons/md";

// Create standalone toast instance
const { toast } = createStandaloneToast();

export const showPromiseToast = async <T,>(
  asyncFunction: Promise<T>, // Directly accepts an async function
  messages: {
    loading: { title?: string; description?: string };
    success: { title?: string; description?: string };
    error: { title?: string; description?: string };
  },
) => {
  // Show loading toast
  toast.promise(asyncFunction, {
    loading: {
      duration: null, // Keeps the toast open until resolved
      isClosable: false,
      render: () => (
        <CustomToast
          status="loading"
          title={messages.loading?.title || "Loading..."}
          description={messages.loading?.description}
        />
      ),
    },
    success: {
      duration: 4000,
      isClosable: true,
      render: ({ id }) => (
        <CustomToast
          status="success"
          onClose={() => toast.close(id as string)}
          title={messages.success?.title || "Success!"}
          description={messages.success?.description}
        />
      ),
    },
    error: {
      duration: 4000,
      isClosable: true,
      render: ({ id }) => (
        <CustomToast
          status="error"
          onClose={() => toast.close(id as string)}
          title={messages.error?.title || "Error!"}
          description={messages.error?.description}
        />
      ),
    },
  });
};

// Custom Toast Component
const CustomToast = ({
  title,
  description,
  status,
  onClose,
}: {
  title: string;
  description?: string;
  status: "success" | "error" | "loading";
  onClose?: () => void;
}) => (
  <div
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
    {status !== "loading" && (
      <div
        className="flex w-[10%] cursor-pointer justify-end text-xl"
        onClick={onClose}
      >
        <MdClose />
      </div>
    )}
  </div>
);

// Get toast style based on status
const getToastStyle = (status: "success" | "error" | "loading") => {
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
    case "loading":
      return {
        bg: "bg-blue-200",
        border: "border-transparent",
        textColor: "text-black",
        icon: <Spinner size="sm" className="text-black" />,
      };
    default:
      return {
        bg: "bg-white",
        textColor: "text-black",
        icon: null,
      };
  }
};
