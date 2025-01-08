import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface OptionsSelectorProps {
  options: { key: string; title: string }[];
  defaultOption: string;
  onClick: (option: { key: string; title: string }) => void;
  title?: string;
}

// Customer Select Component
const OptionsSelector: React.FC<OptionsSelectorProps> = ({
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

  const handleOptionSelect = (option: { key: string; title: string }) => {
    onClick(option); // Pass the selected value back to parent
    setIsOpen(false); // Close the dropdown
  };

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
          <div className="custom-scrollbar-select border-border absolute bottom-11 left-0 z-10 max-h-52 w-full overflow-y-auto rounded-lg border border-neutral-200 bg-background p-2 text-sm text-textSecondary shadow-custom-light dark:border-neutral-700/50">
            <div className="space-y-1">
              {Object.values(options).map((option) => (
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
        )}
      </div>
    </div>
  );
};

export default OptionsSelector;
