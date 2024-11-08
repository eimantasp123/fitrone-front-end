import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import PropTypes from "prop-types";

// Customer Select Component
export default function CustomerSelect({
  options,
  defaultOption = "City",
  title = "Title",
}) {
  const [selected, setSelected] = useState(defaultOption);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  // Close the dropdown when clicked outside
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isOpen && modalRef.current && !modalRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpen]);

  return (
    <div ref={modalRef} className="flex items-center gap-2">
      {/* The visible part of the custom select */}
      <h3 className="text-nowrap pl-1 text-sm font-semibold">{title}</h3>
      <div
        className={`relative flex w-full cursor-pointer items-center justify-between text-nowrap rounded-lg bg-backgroundSecondary py-2 pl-4 pr-2 text-sm transition-colors duration-300 ease-in-out dark:bg-backgroundLight md:py-[5px] 3xl:py-2`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected}</span>
        <MdKeyboardArrowDown
          className={`text-lg text-textSecondary transition-transform duration-300 ease-in-out ${isOpen ? "rotate-90" : ""}`}
        />
        {/* Dropdown menu */}
        {isOpen && (
          <div className="custom-scrollbar-select absolute left-0 top-[40px] z-10 max-h-52 w-full overflow-y-auto rounded-lg border border-borderPrimary bg-background p-2 text-sm text-textSecondary shadow-custom-light md:top-[35px]">
            <div className="space-y-1">
              {options.map((option) => (
                <div
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`cursor-pointer text-nowrap rounded-lg px-3 py-[6px] text-left hover:bg-backgroundSecondary dark:hover:bg-backgroundLight ${
                    selected === option
                      ? "bg-backgroundSecondary dark:bg-backgroundLight"
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
}

CustomerSelect.propTypes = {
  options: PropTypes.array.isRequired,
  defaultOption: PropTypes.string,
  title: PropTypes.string,
};
