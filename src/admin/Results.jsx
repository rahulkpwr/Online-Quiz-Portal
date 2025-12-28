import { useEffect, useState } from "react";
import API from "../services/api";

export default function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    API.get("/admin_get_results.php")
      .then(res => {
        setResults(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => setResults([]));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 All Student Results</h2>

      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>User Name</th>
              <th>Exam Name</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, index) => (
              <tr key={index}>
                <td>{r.user_name}</td>
                <td>{r.exam_title}</td>
                <td><b>{r.score}</b></td>
                <td>{formatDate(r.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString() + " " + d.toLocaleTimeString();
}
