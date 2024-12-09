import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
interface SelectOptionsProps {
  options: string[];
  defaultOption: string;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  title?: string;
}

// Customer Select Component
const SelectOptions: React.FC<SelectOptionsProps> = ({
  options,
  defaultOption,
  onClick,
  title,
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
    <div ref={modalRef} className="flex w-full items-center gap-2">
      {/* The visible part of the custom select */}
      {title && (
        <h3 className="text-nowrap pl-1 text-sm font-semibold">{title}</h3>
      )}
      <div
        className={`relative flex w-full cursor-pointer items-center justify-between text-nowrap rounded-lg bg-backgroundSecondary py-2 pl-4 pr-2 text-sm transition-colors duration-300 ease-in-out dark:bg-backgroundSecondary`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{defaultOption}</span>
        <MdKeyboardArrowDown
          className={`text-lg text-textSecondary transition-transform duration-300 ease-in-out ${isOpen ? "rotate-90" : ""}`}
        />
        {/* Dropdown menu */}
        {isOpen && (
          <div className="custom-scrollbar-select border-border absolute bottom-11 left-0 z-10 max-h-52 w-full overflow-y-auto rounded-lg border bg-background p-2 text-sm text-textSecondary shadow-custom-light">
            <div className="space-y-1">
              {options.map((option) => (
                <div
                  key={option}
                  onClick={onClick}
                  className={`cursor-pointer text-nowrap rounded-lg px-3 py-[6px] text-left hover:bg-backgroundSecondary dark:hover:bg-backgroundDark`}
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

export default SelectOptions;
