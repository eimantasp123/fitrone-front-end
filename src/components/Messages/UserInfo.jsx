const UserInfo = () => {
  return (
    <div className="w-1/4 bg-white border rounded-tr-lg rounded-br-lg p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img src="path_to_selected_contact_avatar" alt="Sabrina Moldova" className="w-10 h-10 rounded-full mr-3" />
          <div>
            <h3 className="text-lg font-semibold">Sabrina Moldova</h3>
            <p className="text-sm text-green-500">+62 989-289-929</p>
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto mb-4">
        <h4 className="text-md font-semibold mb-2">Contact Information</h4>
        <p>
          Status: <span className="text-green-500">Assigned</span>
        </p>
        <p>Start chat: 9:14 AM</p>
        <p>Country: Yordania</p>
        <div className="mt-4">
          <h4 className="text-md font-semibold mb-2">Add tag</h4>
          <div className="flex flex-wrap gap-2">
            <button className="bg-gray-200 text-gray-700 py-1 px-2 rounded-lg">Shopping</button>
            <button className="bg-gray-200 text-gray-700 py-1 px-2 rounded-lg">Asking</button>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-md font-semibold mb-2">Assigned by</h4>
          <div className="flex items-center mb-2">
            <img src="path_to_avatar" alt="CS Niki Ayu" className="w-6 h-6 rounded-full mr-2" />
            <span>CS Niki Ayu</span>
          </div>
          <div className="flex items-center">
            <img src="path_to_avatar" alt="CS Geeburn" className="w-6 h-6 rounded-full mr-2" />
            <span>CS Geeburn</span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-md font-semibold mb-2">Add Note</h4>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          rows="4"
          placeholder="Type your note here..."
        />
      </div>
    </div>
  );
};

export default UserInfo;
