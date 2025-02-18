import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface CustomSelectProps {
  options: { key: string; title: string }[];
  defaultOption?: string;
  title?: string;
  onChange: (option: { key: string; title: string }) => void;
  selectedOption?: string | null;
  background?: string;
  maxH?: string;
  optionsModalPosition?: "top" | "bottom";
}

/**
 * Custom select component with dropdown
 */
const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  defaultOption = "",
  selectedOption,
  onChange,
  title,
  background = "bg-backgroundSecondary dark:bg-backgroundLight",
  maxH = "max-h-52",
  optionsModalPosition = "top",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

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

  // Handler for selecting an option
  const handleOptionSelect = (option: { key: string; title: string }) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={modalRef} className="flex w-full items-center gap-2">
      {/* The visible part of the custom select */}
      {title && (
        <h3 className="text-nowrap pl-1 text-sm font-semibold">{title}</h3>
      )}
      <div
        className={`relative flex w-full cursor-pointer items-center ${background} justify-between text-nowrap rounded-md py-2 pl-4 pr-2 text-sm transition-colors duration-300 ease-in-out md:py-2 3xl:py-2`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="overflow-hidden overflow-ellipsis">
          {!selectedOption ? defaultOption : selectedOption}
        </span>
        <MdKeyboardArrowDown
          className={`text-lg text-textSecondary transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-90" : ""
          }`}
        />
        {/* Dropdown menu */}

        <div
          className={`custom-scrollbar-select transform transition-all duration-300 ease-in-out ${isOpen ? "visible translate-y-0 opacity-100" : `invisible ${optionsModalPosition === "top" ? "-translate-y-2" : "translate-y-2"} opacity-0`} border-border absolute left-0 ${optionsModalPosition === "top" ? "top-[40px]" : "bottom-[52px]"} z-10 ${maxH} w-full overflow-y-auto rounded-lg border border-neutral-200 bg-background p-2 text-sm text-textSecondary shadow-custom-light dark:border-neutral-700/50`}
        >
          <div className="space-y-1">
            {options.map((option) => (
              <div
                key={option.key}
                onClick={() => handleOptionSelect(option)}
                className={`cursor-pointer text-nowrap rounded-lg px-3 py-[6px] text-left hover:bg-backgroundSecondary dark:hover:bg-backgroundDark`}
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

export default CustomSelect;
