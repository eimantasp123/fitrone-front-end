import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div>
      <h1>Admin Dashboard</h1>
    </div>
  );
}
