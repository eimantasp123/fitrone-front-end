import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface CustomSelectProps {
  options: { key: string; title: string }[];
  defaultOption?: string;
  title?: string;
  onChange: (option: { key: string; title: string }) => void;
  selectedOption?: string | null;
  background?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  defaultOption = "",
  selectedOption,
  onChange,
  title,
  background = "bg-backgroundSecondary dark:bg-backgroundLight",
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
        <span>{!selectedOption ? defaultOption : selectedOption}</span>
        <MdKeyboardArrowDown
          className={`text-lg text-textSecondary transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-90" : ""
          }`}
        />
        {/* Dropdown menu */}
        {isOpen && (
          <div className="custom-scrollbar-select absolute left-0 top-[40px] z-10 max-h-52 w-full overflow-y-auto rounded-lg border border-neutral-200 bg-background p-2 text-sm text-textSecondary shadow-custom-light dark:border-neutral-700/50 md:top-[40px] 3xl:top-[40px]">
            <div className="space-y-1">
              {Object.values(options).map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={`cursor-pointer text-nowrap rounded-lg px-3 py-[6px] text-left hover:bg-backgroundSecondary dark:hover:bg-backgroundDark ${
                    defaultOption === option.key
                      ? "bg-backgroundSecondary dark:bg-neutral-800"
                      : ""
                  }`}
                >
                  {option.title}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
