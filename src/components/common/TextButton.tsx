interface TextButtonProps {
  type?: "button" | "submit" | "reset";
  text?: string;
  className?: string;
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  primary?: boolean;
}

const TextButton: React.FC<TextButtonProps> = ({
  type = "button",
  text = "Text Buton",
  className = "",
  icon = null,
  onClick = undefined,
  primary = false,
}) => {
  return (
    <button
      type={type}
      className={`${className} rounded-lg ${icon ? "flex items-center" : ""} px-6 py-2 ${primary ? "bg-primary text-black hover:bg-primaryLight dark:hover:bg-primaryDark" : "bg-backgroundSecondary hover:bg-neutral-200 dark:bg-backgroundSecondary dark:text-textPrimary dark:hover:bg-neutral-800"} text-sm font-semibold transition-all duration-300 ease-in-out`}
      onClick={onClick}
    >
      {icon && icon}
      <span className="text-nowrap">{text}</span>
    </button>
  );
};

export default TextButton;
