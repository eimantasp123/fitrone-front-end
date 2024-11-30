interface LinkButtonProps {
  onClick: () => void;
  text: string;
  textSize?: string;
  className?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  onClick,
  text,
  textSize = "text-xs",
  className,
}) => {
  return (
    <button
      className={`${textSize} text-nowrap font-medium text-black transition-colors duration-300 ease-in-out hover:text-neutral-500 dark:text-white dark:hover:text-neutral-400 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default LinkButton;
