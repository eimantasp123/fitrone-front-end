import React, { useEffect, useRef, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { Controller, useFormContext } from "react-hook-form";
import { MdKeyboardArrowDown } from "react-icons/md";

interface MultipleOptionsSelectAndRegisterToFormProps {
  name: string;
  options: { key: string; title: string }[];
  placeholder?: string;
  label?: string;
  required?: boolean;
  optionsModalPosition?: "top" | "bottom";
}

/**
 * Custom component that allows multiple option selection and registers to form.
 */
const MultipleOptionsSelectAndRegisterToForm: React.FC<
  MultipleOptionsSelectAndRegisterToFormProps
> = ({
  name,
  options,
  placeholder = "Placeholder",
  label,
  required = false,
  optionsModalPosition = "bottom",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const {
    formState: { errors },
    control,
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

  return (
    <div className="flex w-full flex-col" ref={modalRef}>
      {label && (
        <h3 className="mb-1 text-nowrap text-[13px]">
          {label} {required ? <span className="text-red-500">*</span> : null}
        </h3>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
            {/* Selected items */}
            {Array.isArray(field.value) && field.value.length > 0 && (
              <div className="flex flex-wrap items-center gap-1">
                {field.value.map((item: string) => {
                  // Find the translated title for the current preference
                  const translatedItem = options.find(
                    (option) => option.key === item,
                  )?.title;

                  // Fallback for invalid keys
                  if (!translatedItem) {
                    console.warn(`Invalid key "${item}" in field.value`);
                    return null;
                  }

                  return (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-full bg-backgroundSecondary px-2 py-1"
                    >
                      <span className="text-xs text-textSecondary">
                        {translatedItem || item}
                      </span>
                      <IoMdCloseCircle
                        onClick={() =>
                          field.onChange(
                            field.value.filter(
                              (currentItem: string) => currentItem !== item,
                            ),
                          )
                        }
                        className="-mb-[1px] cursor-pointer text-[14px] text-red-500"
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Custom Select */}
            <div
              className={`relative flex w-full ${
                errors[name]
                  ? "border-2 border-red-400 dark:border-red-400"
                  : ""
              } cursor-pointer items-center justify-between text-nowrap rounded-lg border border-borderDark py-3 pl-4 pr-2 text-sm transition-all duration-300 ease-in-out ${
                isOpen
                  ? "ring-[1.5px] ring-neutral-400/70 dark:ring-primary"
                  : "ring-0 ring-transparent"
              } hover:border-neutral-300 dark:border-borderLight dark:hover:border-neutral-600`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>{placeholder}</span>
              <MdKeyboardArrowDown
                className={`text-lg text-textSecondary transition-transform duration-300 ease-in-out ${
                  isOpen ? "rotate-90" : ""
                }`}
              />
              {/* Dropdown menu */}
              <div
                className={`custom-scrollbar-select transform transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "visible translate-y-0 opacity-100"
                    : `invisible ${
                        optionsModalPosition === "top"
                          ? "-translate-y-2"
                          : "translate-y-2"
                      } opacity-0`
                } border-border absolute left-0 max-h-40 ${
                  optionsModalPosition === "top"
                    ? "top-[52px]"
                    : "bottom-[52px]"
                } z-10 max-h-52 w-full overflow-y-auto rounded-lg border border-neutral-200 bg-background p-2 text-sm text-textSecondary shadow-custom-light dark:border-neutral-700/50`}
              >
                <div className="space-y-1">
                  {options.map((option) => (
                    <div
                      key={option.key}
                      onClick={() => {
                        if (!field.value?.includes(option.key)) {
                          field.onChange([...(field.value || []), option.key]);
                        }
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

export default MultipleOptionsSelectAndRegisterToForm;
