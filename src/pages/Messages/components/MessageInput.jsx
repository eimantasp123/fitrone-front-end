import { CiLocationArrow1 } from "react-icons/ci";

// Message Input Component
const MessageInput = () => (
  <div className="flex items-center gap-4 px-4 pt-5">
    <textarea
      type="text"
      rows="1"
      className="flex-1 resize-none rounded-3xl border border-borderPrimary bg-backgroundSecondary px-5 py-3 text-textPrimary outline-none transition-all duration-200 ease-in-out scrollbar-none placeholder:text-textSecondary focus:border-textSecondary focus:shadow-custom-light2"
      placeholder="Type a message..."
      onInput={(e) => {
        e.target.style.height = "auto";
        e.target.style.height = `${Math.min(e.target.scrollHeight, 300)}px`;
      }}
    />
    <div className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-borderPrimary bg-buttonPrimaryDark transition-colors duration-200 ease-out hover:bg-buttonPrimaryDarkHover">
      <CiLocationArrow1 className="text-lg text-white" />
    </div>
  </div>
);

export default MessageInput;
