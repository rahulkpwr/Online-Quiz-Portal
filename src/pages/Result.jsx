import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Result() {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    API.get(`/get_latest_result.php?user_id=${user.id}`)
      .then(res => {
        setResult(res.data);
      })
      .catch(() => {
        setResult(null);
      });
  }, [user, navigate]);

  if (!result) {
    return <h2 style={{ textAlign: "center" }}>Loading result...</h2>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Exam Result</h2>
      <h3 style={styles.exam}>{result.exam_title}</h3>

      <div style={styles.card}>
        <p><strong>Total Questions:</strong> {result.total_questions}</p>
        <p style={{ color: "green" }}>
          <strong>Correct Answers:</strong> {result.correct_answers}
        </p>
        <p style={{ color: "red" }}>
          <strong>Incorrect Answers:</strong> {result.wrong_answers}
        </p>
        <p style={styles.score}>
          Score: {result.score}
        </p>
      </div>

      <button style={styles.btn} onClick={() => navigate("/history")}>
        View History
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    textAlign: "center",
    fontFamily: "Arial"
  },
  title: {
    marginBottom: "10px"
  },
  exam: {
    color: "#555",
    marginBottom: "20px"
  },
  card: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "#f9f9f9"
  },
  score: {
    fontSize: "22px",
    fontWeight: "bold",
    marginTop: "15px"
  },
  btn: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer"
  }
};

