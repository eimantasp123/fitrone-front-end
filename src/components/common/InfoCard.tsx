import { Tooltip, useDisclosure } from "@chakra-ui/react";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineRemove } from "react-icons/md";

interface InfoCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  unit: string;
  description?: string;
  className?: string;
  width?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  title,
  value,
  unit,
  description,
  width = "flex-1",
  className = "px-5 py-2  bg-backgroundSecondary dark:bg-backgroundSecondary",
}) => {
  const { onOpen, onClose } = useDisclosure();

  return (
    <div
      className={`flex ${className} ${width} items-center gap-3 rounded-full`}
    >
      {icon && icon}

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
};

export default InfoCard;
