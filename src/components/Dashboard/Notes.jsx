import { useState } from "react";

const Notes = () => {
  const [notes, setNotes] = useState("");

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  return (
    <div className="bg-white p-6 rounded-lg border mt-6">
      <h2 className="text-xl font-semibold mb-4">Daily Notes</h2>
      <textarea
        className="w-full p-2 border rounded-lg"
        rows="5"
        placeholder="Write your notes here..."
        value={notes}
        onChange={handleNotesChange}
      />
    </div>
  );
};

export default Notes;
