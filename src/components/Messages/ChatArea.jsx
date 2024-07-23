import { useState } from "react";

const messages = [
  { from: "Sabrina", message: "Hi, Good Morning", time: "9:14 AM", fromUser: false },
  { from: "You", message: "Hi, Sabrina Good Morning", time: "9:15 AM", fromUser: true },
  // Add more messages as needed
];

const ChatArea = () => {
  const [currentMessage, setCurrentMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    // Add the logic to send the message
    console.log("Message sent:", currentMessage);
    setCurrentMessage("");
  };

  return (
    <div className="w-1/2 bg-white border-t border-b p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img src="path_to_selected_contact_avatar" alt="Sabrina Moldova" className="w-10 h-10 rounded-full mr-3" />
          <div>
            <h3 className="text-lg font-semibold">Sabrina Moldova</h3>
            <p className="text-sm text-green-500">WhatsApp</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <i className="text-gray-400 fas fa-phone"></i>
          <i className="text-gray-400 fas fa-video"></i>
          <i className="text-gray-400 fas fa-ellipsis-h"></i>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.fromUser ? "justify-end" : "justify-start"} mb-4`}>
            <div className={`p-3 rounded-lg ${msg.fromUser ? "bg-blue-500 text-white" : "bg-gray-100 text-black"}`}>
              <p>{msg.message}</p>
              <p className="text-xs text-gray-500">{msg.time}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex items-center">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Type a message..."
        />
        <button type="submit" className="ml-3 bg-blue-500 text-white p-2 rounded-lg">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatArea;
