import React, { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { MdKeyboardArrowDown } from "react-icons/md";

interface OptionsSelectAndRegisterToFormProps {
  options: { key: string; title: string }[];
  placeholder?: string;
  label?: string;
  name: string;
  required?: boolean;
  optionsModalPosition?: "top" | "bottom";
  setDefaultValueKey?: string;
}

/**
 * Custom select component that registers the selected option to the form
 */
const OptionsSelectAndRegisterToForm: React.FC<
  OptionsSelectAndRegisterToFormProps
> = ({
  options,
  placeholder = "Placeholder",
  setDefaultValueKey,
  label,
  required = false,
  name,
  optionsModalPosition = "bottom",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const {
    formState: { errors },
    control,
    setValue,
  } = useFormContext();

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

  // Set the default value if setDefaultValueKey is provided
  useEffect(() => {
    if (setDefaultValueKey) {
      setValue(name, setDefaultValueKey);
    }
  }, [setDefaultValueKey, setValue, name]);

  return (
    <div ref={modalRef} className="flex w-full select-none flex-col">
      {/* The visible part of the custom select */}
      {label && (
        <h3 className="mb-1 text-nowrap text-[13px]">
          {label} {required ? <span className="text-red-500">*</span> : null}
        </h3>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div
            className={`relative flex w-full ${errors[name] ? "border-2 border-red-400 dark:border-red-400" : ""} cursor-pointer items-center justify-between text-nowrap rounded-lg border border-borderDark py-3 pl-4 pr-2 text-sm transition-all duration-300 ease-in-out ${isOpen ? "ring-[1.5px] ring-neutral-400/70 dark:ring-primary" : "ring-0 ring-transparent"} ease-in-out hover:border-neutral-300 dark:border-borderLight dark:hover:border-neutral-600`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="overflow-hidden overflow-ellipsis">
              {field.value
                ? options.find((opt) => opt.key === field.value)?.title
                : placeholder ||
                  options.find((opt) => opt.key === setDefaultValueKey)?.title}
            </span>
            <MdKeyboardArrowDown
              className={`text-lg text-textSecondary transition-transform duration-300 ease-in-out ${isOpen ? "rotate-90" : ""}`}
            />
            {/* Dropdown menu */}
            <div
              className={`custom-scrollbar-select transform transition-all duration-300 ease-in-out ${isOpen ? "visible translate-y-0 opacity-100" : `invisible ${optionsModalPosition === "top" ? "-translate-y-2" : "translate-y-2"} opacity-0`} border-border absolute left-0 max-h-40 ${optionsModalPosition === "top" ? "top-[52px]" : "bottom-[52px]"} z-10 max-h-52 w-full overflow-y-auto rounded-lg border border-neutral-200 bg-background p-2 text-sm text-textSecondary shadow-custom-light dark:border-neutral-700/50`}
            >
              <div className="space-y-1">
                {options.map((option) => (
                  <div
                    key={option.key}
                    onClick={() => {
                      field.onChange(option.key);
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
        )}
      />

      {/* Error Message */}
      {errors[name] && (
        <p className="pt-1 text-[13px] text-red-500 dark:text-red-400">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default OptionsSelectAndRegisterToForm;
