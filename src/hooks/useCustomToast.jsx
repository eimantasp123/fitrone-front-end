import { useToast } from "@chakra-ui/react";
import { IoWarning, IoCheckmarkCircle, IoInformationCircle, IoCloseCircle } from "react-icons/io5";
import { MdClose } from "react-icons/md";

const useCustomToast = () => {
  const toast = useToast();

  const customToast = (options) => {
    const { status, title, description } = options;

    toast({
      position: "bottom",
      duration: 4000,
      isClosable: true,
      containerStyle: {
        width: "450px",
        minWidth: "300px",
        marginBottom: "20px",
      },
      render: ({ id, onClose }) => (
        <div
          key={id}
          className={`${getToastStyle(status).bg} ${getToastStyle(status).border}  ${
            getToastStyle(status).textColor
          } flex gap-2 w-full bg-white  rounded-r-lg border-l-2 shadow-custom-light px-2 py-3 `}
        >
          <div className="flex w-[10%] text-lg ml-2 items-center">{getToastStyle(status).icon}</div>
          <div className="flex w-[80%] flex-col">
            <h2 className="font-medium">{title}</h2>
            {description && <p>{description}</p>}
          </div>
          <div className="w-[10%] flex justify-end  cursor-pointer" onClick={onClose}>
            <MdClose />
          </div>
        </div>
      ),
    });
  };

  return customToast;
};

const getToastStyle = (status) => {
  switch (status) {
    case "success":
      return {
        bg: "bg-white",
        border: "border-green-500",
        textColor: "text-secondary",
        icon: <IoCheckmarkCircle className="text-green-500" />,
      };
    case "error":
      return {
        bg: "bg-white",
        border: "border-red-500",
        textColor: "text-secondary",
        icon: <IoCloseCircle className="text-red-500" />,
      };
    case "warning":
      return {
        bg: "bg-white",
        border: "border-yellow-500",
        textColor: "text-secondary",
        icon: <IoWarning className="text-yellow-500" />,
      };
    case "info":
      return {
        bg: "bg-white",
        border: "border-blue-500",
        textColor: "text-secondary",
        icon: <IoInformationCircle className="text-blue-500" />,
      };
    default:
      return {
        bg: "bg-background",
        textColor: "text-gray-700",
        icon: null,
      };
  }
};

export default useCustomToast;
