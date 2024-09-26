import { formatDistanceToNow, parseISO } from "date-fns";
import PropTypes from "prop-types";

export default function UserProfileCard({
  person,
  onUserClick,
  hoverBg = true,
  className = "w-full rounded-xl px-3 py-2",
}) {
  const { name, image, lastActive, online } = person;
  const formattedTime =
    online === false
      ? `Last active: ${formatDistanceToNow(parseISO(lastActive), {
          addSuffix: true,
        })}`
      : "Online";
  return (
    <>
      <div
        className={`flex cursor-pointer select-none ${className} flex-col gap-4 ${hoverBg ? "transition-colors duration-200 ease-out hover:bg-backgroundSecondary" : ""} `}
        onClick={onUserClick}
      >
        <div className="relative flex items-center gap-4">
          <img src={image} alt={name} className="h-11 w-11 rounded-full" />
          <div className="flex flex-col leading-snug">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-textPrimary">{name}</h4>
            </div>
            <p className="text-sm text-textSecondary">{formattedTime}</p>
          </div>
          <span
            className={`absolute left-[-4px] top-0 size-[13px] rounded-full border-[3px] border-background ${person.online ? "bg-green-600" : "bg-red-600"}`}
          />
        </div>
      </div>
    </>
  );
}

UserProfileCard.propTypes = {
  person: PropTypes.object.isRequired,
  onUserClick: PropTypes.func.isRequired,
  hoverBg: PropTypes.bool,
  className: PropTypes.string,
};
