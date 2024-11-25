import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface CustomerSelectProps {
  options: string[];
  defaultOption?: string;
  title?: string;
  onChange: (value: string) => void;
  selectedOption: string;
}

const CustomerSelect: React.FC<CustomerSelectProps> = ({
  options,
  defaultOption = "",
  selectedOption,
  onChange,
  title,
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

  const handleOptionSelect = (option: string) => {
    onChange(option); // Pass the selected value back to parent
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div ref={modalRef} className="flex w-full items-center gap-2">
      {/* The visible part of the custom select */}
      {title && (
        <h3 className="text-nowrap pl-1 text-sm font-semibold">{title}</h3>
      )}
      <div
        className={`relative flex w-full cursor-pointer items-center justify-between text-nowrap rounded-md bg-backgroundSecondary py-2 pl-4 pr-2 text-sm transition-colors duration-300 ease-in-out dark:bg-backgroundLight md:py-2 3xl:py-2`}
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
          <div className="custom-scrollbar-select absolute left-0 top-[40px] z-10 max-h-52 w-full overflow-y-auto rounded-lg border border-borderPrimary bg-background p-2 text-sm text-textSecondary shadow-custom-light md:top-[40px] 3xl:top-[40px]">
            <div className="space-y-1">
              {options.map((option) => (
                <div
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  className={`cursor-pointer text-nowrap rounded-lg px-3 py-[6px] text-left hover:bg-backgroundSecondary dark:hover:bg-backgroundLight ${
                    defaultOption === option
                      ? "bg-backgroundSecondary dark:bg-neutral-800"
                      : ""
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerSelect;
