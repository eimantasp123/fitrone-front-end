import { formatDistanceToNow, parseISO } from "date-fns";
import PropTypes from "prop-types";
import { useLayoutEffect, useRef } from "react";

// Chat Messages Component
export default function ChatMessages({ messages }) {
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  };

  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-1 flex-col space-y-4 overflow-y-auto p-2 scrollbar-none">
      {messages &&
        messages.map((message) => {
          const formattedTime = formatDistanceToNow(
            parseISO(message.timestamp),
            { addSuffix: true },
          );

          return message.senderId === "user-4" ? (
            <MyMessage
              key={message.messageId}
              message={message.content}
              time={formattedTime}
            />
          ) : (
            <ClientMessage
              key={message.messageId}
              message={message.content}
              time={formattedTime}
            />
          );
        })}
      {!messages.length && (
        <p className="flex h-full items-center justify-center text-textSecondary">
          No messages yet. Start the conversation!
        </p>
      )}
      <div ref={chatEndRef} />
    </div>
  );
}

ChatMessages.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      messageId: PropTypes.string.isRequired,
      senderId: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

// Client Message Component
const ClientMessage = ({ message, time }) => (
  <div className="flex flex-col items-start">
    <div className="max-w-[60%] break-words rounded-lg bg-backgroundSecondary p-3 text-sm text-textPrimary">
      {message}
    </div>
    <span className="mt-1 text-xs text-textSecondary">{time}</span>
  </div>
);

ClientMessage.propTypes = {
  message: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

// My Message Component
const MyMessage = ({ message, time }) => (
  <div className="flex flex-col items-end">
    <div className="max-w-[60%] break-words rounded-lg bg-primary p-3 text-sm text-black">
      {message}
    </div>
    <span className="mt-1 text-xs text-textSecondary">{time}</span>
  </div>
);

MyMessage.propTypes = {
  time: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
