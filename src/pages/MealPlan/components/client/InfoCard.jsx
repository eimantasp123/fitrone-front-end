import { Tooltip, useDisclosure } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineRemove } from "react-icons/md";

export default function InfoCard({
  icon,
  title,
  value,
  unit,
  description,
  width = "flex-1",
  className = "px-4 py-3 sm:py-2 3xl:px-5 3xl:py-3 bg-backgroundSecondary",
}) {
  const { onOpen, onClose } = useDisclosure();

  return (
    <div
      className={`flex ${className} ${width} items-center gap-3 rounded-full`}
    >
      {icon}

      <div className="mr-auto flex h-full flex-col justify-center">
        <div className="flex items-center justify-between gap-8">
          <div className="flex h-full items-center text-nowrap text-xs">
            <p>{title}</p>
            <MdOutlineRemove className="rotate-90 text-[16px] text-textSecondary" />

            <span className="font-semibold">
              {value}
              <span className="pl-1">{unit}</span>
            </span>
          </div>
        </div>
      </div>
      {description && (
        <Tooltip
          sx={{ fontSize: "13px" }}
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
          label={description}
          placement="bottom"
          padding="15px"
          fontWeight={400}
        >
          <span className="inline-block self-end">
            <BsInfoCircle className="cursor-pointer text-sm" />
          </span>
        </Tooltip>
      )}
    </div>
  );
}

InfoCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  iconColor: PropTypes.string,
  icon: PropTypes.element,
  unit: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.string,
};
