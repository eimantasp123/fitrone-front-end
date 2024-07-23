const Notifications = () => {
  // Placeholder data
  const notifications = [
    { id: 1, message: "New user registered" },
    { id: 2, message: "Subscription expired for user John Doe" },
    // Add more notifications as needed
  ];

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id} className="mb-2">
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
