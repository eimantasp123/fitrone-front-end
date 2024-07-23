const ActiveUsers = () => {
  // Placeholder data
  const users = [
    { id: 1, name: "John Doe", status: "active" },
    { id: 2, name: "Jane Smith", status: "active" },
    // Add more users as needed
  ];

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">Active Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="flex justify-between items-center mb-2">
            <span>{user.name}</span>
            <span className="text-green-500">{user.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveUsers;
