const contacts = [
  {
    name: "Theresa Webb",
    status: "Hi! I'm curious about your...",
    time: "15m",
    messages: 0,
    pinned: false,
    avatar: "path_to_avatar",
    platform: "WhatsApp",
  },
  {
    name: "Sabrina Moldova",
    status: "Hi, Good Morning, I'm looking...",
    time: "1h",
    messages: 0,
    pinned: false,
    avatar: "path_to_avatar",
    platform: "WhatsApp",
  },
  // Add more contacts as needed
];

const Sidebar = () => {
  return (
    <div className="w-1/4 bg-white rounded-tl-lg rounded-bl-lg border p-4 flex flex-col">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <i className="absolute left-3 top-3 text-gray-400 fas fa-search"></i>
      </div>
      <div className="flex-grow overflow-y-auto">
        {contacts.map((contact, index) => (
          <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer mb-2">
            <div className="flex items-center">
              <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full mr-3" />
              <div>
                <h3 className="text-sm font-semibold">{contact.name}</h3>
                <p className="text-xs text-gray-500">{contact.status}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">{contact.time}</p>
              {contact.messages > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{contact.messages}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
