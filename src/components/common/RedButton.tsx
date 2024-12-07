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
      disabled={updateLoading}
      className={`text-nowrap rounded-lg ${updateLoading ? "bg-red-400 hover:bg-red-400 dark:bg-red-400 dark:hover:bg-red-400" : "bg-red-500 hover:bg-red-500/90 dark:hover:bg-red-600"} px-6 py-2 text-sm text-white transition-colors ${classname} duration-200 ease-in-out`}
    >
      {updateLoading ? (
        <div className="flex w-full items-center justify-center gap-3">
          <Spinner size="sm" />
          {text}
        </div>
      ) : (
        `${text}`
      )}
    </button>
  );
}
