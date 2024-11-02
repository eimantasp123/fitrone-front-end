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
    <div ref={modalRef} className="flex flex-col items-start gap-1">
      {/* The visible part of the custom select */}
      <h3 className="text-nowrap pl-1 text-xs font-semibold">{title}</h3>
      <div
        className={`relative flex w-full cursor-pointer text-nowrap text-sm ${isOpen ? "bg-primaryLight border-borderSecondary" : "border-transparent"} hover:bg-primaryLight hover:border-borderSecondary items-center justify-between rounded-full border-[1px] bg-backgroundSecondary py-2 pl-4 pr-2 transition-colors duration-300 ease-in-out md:py-1 3xl:py-2`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected}</span>
        <MdKeyboardArrowDown
          className={`text-lg text-textSecondary transition-transform duration-300 ease-in-out ${isOpen ? "rotate-90" : ""}`}
        />
        {/* Dropdown menu */}
        {isOpen && (
          <div className="custom-scrollbar-select absolute left-0 top-[40px] z-10 max-h-52 w-full overflow-y-auto rounded-2xl border border-borderColor bg-background p-2 text-sm text-textSecondary shadow-custom-light md:top-[35px]">
            <div className="space-y-1">
              {options.map((option) => (
                <div
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`cursor-pointer text-nowrap rounded-full px-3 py-1 text-left hover:bg-backgroundSecondary ${
                    selected === option
                      ? "bg-primaryLight text-textPrimary"
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
