import { Tooltip, useDisclosure } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function InfoCard({ icon, title, value, unit, description }) {
  const { onOpen, onClose } = useDisclosure();
  return (
    <Tooltip
      sx={{ fontSize: "13px" }}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      label={description}
      placement="bottom"
      padding="15px"
      fontWeight={400}
    >
      <div className="flex flex-1 items-center gap-3 rounded-lg border border-borderColor bg-background px-2 py-2 shadow-sm sm:px-3 sm:py-2">
        <span className="flex size-7 items-center justify-center rounded-full bg-backgroundSecondary text-sm shadow-md md:size-8">
          {icon}
        </span>
        <div className="flex flex-col justify-center">
          <div className="flex justify-between gap-8">
            <div className="flex flex-col items-start text-nowrap text-[13px]">
              <p className="text-xs">{title}</p>
              <span className="font-semibold">
                {value}
                <span className="pl-1">{unit}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Tooltip>
  );
}

InfoCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  iconColor: PropTypes.string,
  icon: PropTypes.element,
  unit: PropTypes.string,
  description: PropTypes.string,
};
