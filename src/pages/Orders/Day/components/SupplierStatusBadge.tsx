import React from "react";

interface SupplierStatusBadgeProps {
  status: "not_done" | "preparing" | "done";
  text: string;
  paddingY?: string;
}

const SupplierStatusBadge: React.FC<SupplierStatusBadgeProps> = ({
  status,
  text,
  paddingY = "py-[2px]",
}) => {
  const className = (() => {
    switch (status) {
      case "not_done":
        return "bg-backgroundSecondary dark:bg-background";
      case "preparing":
        return "bg-yellow-400 text-black";
      case "done":
        return "bg-primary text-black";
      default:
        return "bg-gray-500";
    }
  })();

  return (
    <span className={`${className} rounded-full px-4 ${paddingY} text-[13px]`}>
      {text}
    </span>
  );
};

export default SupplierStatusBadge;
