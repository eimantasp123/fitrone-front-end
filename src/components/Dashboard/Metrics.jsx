const Metrics = () => {
  // Placeholder data
  const metrics = [
    { id: 1, label: "User Activity", value: "75%" },
    { id: 2, label: "Last Update", value: "2 days ago" },
    // Add more metrics as needed
  ];

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">Metrics</h2>
      <ul>
        {metrics.map((metric) => (
          <li key={metric.id} className="flex justify-between items-center mb-2">
            <span>{metric.label}</span>
            <span className="font-bold">{metric.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Metrics;
