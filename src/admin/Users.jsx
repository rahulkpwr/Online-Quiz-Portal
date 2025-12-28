import { useEffect, useState } from "react";
import API from "../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);

  const loadUsers = () => {
    API.get("/get_users.php")
      .then(res => setUsers(res.data))
      .catch(() => setUsers([]));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const toggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";

    API.post("/toggle_user_status.php", {
      user_id: id,
      status: newStatus
    }).then(() => loadUsers());
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>👤 Manage Users</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td
                style={{
                  color: u.status === "blocked" ? "red" : "green"
                }}
              >
                {u.status}
              </td>
              <td>
                <button
                  onClick={() => toggleStatus(u.id, u.status)}
                  style={{
                    background:
                      u.status === "active" ? "red" : "green",
                    color: "white",
                    padding: "5px 10px",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  {u.status === "active" ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

