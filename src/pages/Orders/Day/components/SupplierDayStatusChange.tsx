import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface SupplierDayStatusChangeProps {
  options: { key: string; title: string }[];
  placeholder?: string;
  optionsModalPosition?: "top" | "bottom";
}

/**
 * Custom select component for changing the status of the order
 */
const SupplierDayStatusChange: React.FC<SupplierDayStatusChangeProps> = ({
  options,
  placeholder = "Placeholder",
  optionsModalPosition = "bottom",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Close the dropdown when clicked outside
  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpen]);

  return (
    <div ref={modalRef} className="flex w-full select-none flex-col">
      {/* The visible part of the custom select */}

      <div
        className={`relative flex w-full cursor-pointer items-center justify-between text-nowrap rounded-lg border py-1 pl-4 pr-2 text-sm transition-all duration-300 ease-in-out ${isOpen ? "ring-[1.5px] ring-neutral-400/70 dark:ring-primary" : "ring-0 ring-transparent"} ease-in-out hover:border-neutral-300 dark:border-borderLight dark:hover:border-neutral-600`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="overflow-hidden overflow-ellipsis">
          {/* {field.value
                ? options.find((opt) => opt.key === field.value)?.title
                : placeholder} */}
          {placeholder}
        </span>
        <MdKeyboardArrowDown
          className={`text-lg text-textSecondary transition-transform duration-300 ease-in-out ${isOpen ? "rotate-90" : ""}`}
        />
        {/* Dropdown menu */}
        <div
          className={`custom-scrollbar-select transform transition-all duration-300 ease-in-out ${isOpen ? "visible translate-y-0 opacity-100" : `invisible ${optionsModalPosition === "top" ? "-translate-y-2" : "translate-y-2"} opacity-0`} border-border absolute left-0 max-h-40 ${optionsModalPosition === "top" ? "top-[37px]" : "bottom-[37px]"} z-10 max-h-52 w-full overflow-y-auto rounded-lg border border-neutral-200 bg-background p-2 text-sm text-textSecondary shadow-custom-light dark:border-neutral-700/50`}
        >
          <div className="space-y-1">
            {options.map((option) => (
              <div
                key={option.key}
                onClick={() => {
                  //   field.onChange(option.key);
                  setIsOpen(false);
                }}
                className={`cursor-pointer text-wrap rounded-lg px-3 py-2 text-left hover:bg-backgroundSecondary dark:hover:bg-backgroundDark`}
              >
                {option.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDayStatusChange;
