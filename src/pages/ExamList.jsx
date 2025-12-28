import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/logout";

export default function ExamList() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/get_exams.php")
      .then(res => setExams(Array.isArray(res.data) ? res.data : []))
      .catch(() => setExams([]));
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2>📚 Available Exams</h2>
        <button style={styles.logout} onClick={() => logout(navigate)}>
          Logout
        </button>
      </div>

      <div style={styles.grid}>
        {exams.length === 0 ? (
          <p>No exams available</p>
        ) : (
          exams.map(exam => (
            <div key={exam.id} style={styles.card}>
              <h3>{exam.title}</h3>
              <p>⏱ {exam.duration_minutes} minutes</p>

              <button
                style={styles.button}
                onClick={() => navigate(`/exam/${exam.id}`)}
              >
                Start Exam
              </button>
            </div>
          ))
        )}
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          style={styles.historyBtn}
          onClick={() => navigate("/history")}
        >
          📘 View History
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "40px",
    background: "#f1f5f9",
    minHeight: "100vh",
    fontFamily: "Segoe UI, sans-serif"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
  },
  logout: {
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px"
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
    textAlign: "center"
  },
  button: {
    marginTop: "15px",
    padding: "10px",
    width: "100%",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  historyBtn: {
    padding: "10px 20px",
    background: "#0f172a",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};
