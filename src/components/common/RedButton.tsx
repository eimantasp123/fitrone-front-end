import { Spinner } from "@chakra-ui/react";

interface RedButtonProps {
  updateLoading: boolean;
  width?: string;
  type?: "button" | "submit" | "reset";
  text?: string;
  classname?: string;
  onClick?: () => void;
}

export default function RedButton({
  updateLoading,
  width = "",
  classname = "",
  type = "submit",
  text = "Red Button",
  onClick,
}: RedButtonProps) {
  return (
    <button
      style={{ width: `${width}` }}
      type={type}
      onClick={onClick}
      className={`text-nowrap rounded-lg bg-red-600 px-6 py-2 text-sm text-white transition-colors ${classname} duration-200 ease-in-out hover:bg-red-400`}
    >
      {updateLoading ? <Spinner size="sm" /> : `${text}`}
    </button>
  );
}
