import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
import OptionsSelector from "./OptionsSelector";

interface DietaryFilterProps {
  title: string;
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
  options: { key: string; title: string }[];
  placeholder: string;
}

/**
 * DietaryFilter component to manage dietary preferences and restrictions
 */
const DietaryFilter: React.FC<DietaryFilterProps> = ({
  title,
  items,
  setItems,
  options,
  placeholder,
}) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <h4 className="text-sm">{title}</h4>
      {items.length !== 0 && (
        <div className="flex flex-wrap items-center gap-1">
          {items.map((item) => {
            // Find the translated title for the current preference
            const translatedItem = options.find(
              (option) => option.key === item,
            )?.title;

            return (
              <div
                key={item}
                className="flex items-center gap-2 rounded-full bg-backgroundSecondary px-2 py-1"
              >
                <span className="text-xs text-textSecondary">
                  {translatedItem || item}{" "}
                </span>

                <IoMdCloseCircle
                  onClick={() =>
                    setItems(
                      items.filter((currentItem) => currentItem !== item),
                    )
                  }
                  className="-mb-[1px] cursor-pointer text-[14px] text-red-500"
                />
              </div>
            );
          })}
        </div>
      )}
      <OptionsSelector
        options={options}
        defaultOption={placeholder}
        onClick={(option) => {
          if (!items.includes(option.key)) {
            setItems([...items, option.key]);
          }
        }}
      />
    </div>
  );
};

export default DietaryFilter;
