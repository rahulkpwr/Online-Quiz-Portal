import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Timer from "../components/Timer";

export default function Exam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const submittedRef = useRef(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [time, setTime] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     RESET WHEN EXAM CHANGES
     ========================= */
  useEffect(() => {
    setAnswers({});
    setQuestions([]);
    setTime(null);
    submittedRef.current = false;

    localStorage.removeItem("answers");
    localStorage.removeItem("time");
  }, [id]);

  /* =========================
     LOAD EXAM + QUESTIONS
     ========================= */
  useEffect(() => {
    // Get exam duration
    API.get(`/get_exam.php?exam_id=${id}`)
      .then(res => {
        if (res.data?.duration_minutes) {
          setTime(res.data.duration_minutes * 60);
        }
      })
      .catch(() => alert("Failed to load exam"));

    // Get questions
    API.get(`/get_questions.php?exam_id=${id}`)
      .then(res => {
        setQuestions(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(() => {
        setQuestions([]);
        setLoading(false);
      });
  }, [id]);

  /* =========================
     TIMER LOGIC
     ========================= */
  useEffect(() => {
    if (time === null || loading || submittedRef.current) return;

    localStorage.setItem("time", time);

    if (time <= 0) {
      submitExam();
      return;
    }

    const t = setTimeout(() => setTime(prev => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [time, loading]);

  /* =========================
     SAVE ANSWERS
     ========================= */
  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]);

  /* =========================
     SUBMIT EXAM (ONLY SEND ANSWERS)
     ========================= */
  const submitExam = async () => {
    if (submittedRef.current) return;
    submittedRef.current = true;

    try {
      await API.post("/submit_exam.php", {
        user_id: user.id,
        exam_id: Number(id),
        answers
      });

      localStorage.removeItem("answers");
      localStorage.removeItem("time");

      navigate("/result");
    } catch {
      alert("Failed to submit exam");
    }
  };

  /* =========================
     UI
     ========================= */
  return (
    <div style={{ padding: "20px" }}>
      <h2>Exam</h2>

      {time !== null && <Timer time={time} />}

      <hr />

      {loading ? (
        <p>Loading questions...</p>
      ) : questions.length === 0 ? (
        <p>No questions found for this exam.</p>
      ) : (
        questions.map((q, index) => (
          <div key={q.id} style={{ marginBottom: "20px" }}>
            <h4>
              {index + 1}. {q.question}
            </h4>

            {["A", "B", "C", "D"].map(opt => (
              <label key={opt} style={{ display: "block" }}>
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  checked={answers[q.id] === opt}
                  onChange={() =>
                    setAnswers(prev => ({
                      ...prev,
                      [q.id]: opt
                    }))
                  }
                />
                {q[`option_${opt.toLowerCase()}`]}
              </label>
            ))}
          </div>
        ))
      )}

      <button onClick={submitExam} disabled={submittedRef.current}>
        Submit Exam
      </button>
    </div>
  );
}
