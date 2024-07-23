const Messages = () => {
  // Placeholder data
  const messages = [
    { id: 1, from: "Jane Smith", content: "Can you update my workout plan?" },
    { id: 2, from: "John Doe", content: "What should I eat before my workout?" },
    // Add more messages as needed
  ];

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id} className="mb-2">
            <div className="font-bold">{message.from}</div>
            <div>{message.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
