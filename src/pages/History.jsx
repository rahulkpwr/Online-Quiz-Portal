import { useEffect, useState, useRef } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/logout";

export default function History() {
  const [history, setHistory] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const fetched = useRef(false);

  useEffect(() => {
    if (!user || fetched.current) return;
    fetched.current = true;

    API.get(`/get_history.php?user_id=${user.id}`)
      .then(res => {
        setHistory(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => setHistory([]));
  }, [user]);

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto" }}>
      <button
        onClick={() => logout(navigate)}
        style={{
          float: "right",
          background: "red",
          color: "white",
          padding: "8px 12px",
          border: "none"
        }}
      >
        Logout
      </button>

      <h2>📘 Past Exam Results</h2>

      {history.length === 0 ? (
        <p>No exams attempted yet.</p>
      ) : (
        <table width="100%" border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Exam Name</th>
              <th>Date</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index}>
                <td>{item.exam_title}</td>
                <td>{new Date(item.created_at).toLocaleString()}</td>
                <td><b>{item.score}</b></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <br />
      <button onClick={() => navigate("/exams")}>
        Back to Exams
      </button>
    </div>
  );
}
