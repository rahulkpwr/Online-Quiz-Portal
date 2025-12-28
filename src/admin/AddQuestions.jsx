import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function AddQuestions() {
  const { id } = useParams(); // exam_id

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState({
    A: "", B: "", C: "", D: ""
  });
  const [correct, setCorrect] = useState("A");
  const [questions, setQuestions] = useState([]);

  const loadQuestions = () => {
    API.get(`/get_questions.php?exam_id=${id}`)
      .then(res => {
        setQuestions(Array.isArray(res.data) ? res.data : []);
      });
  };

  useEffect(() => {
    loadQuestions();
  }, [id]);

  const addQuestion = async () => {
    if (!question || !options.A || !options.B || !options.C || !options.D) {
      alert("Fill all fields");
      return;
    }

    const res = await API.post("/add_question.php", {
      exam_id: id,
      question,
      option_a: options.A,
      option_b: options.B,
      option_c: options.C,
      option_d: options.D,
      correct_option: correct
    });

    if (res.data.success) {
      alert("Question added");
      setQuestion("");
      setOptions({ A:"", B:"", C:"", D:"" });
      setCorrect("A");
      loadQuestions();
    } else {
      alert("Failed to add question");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px" }}>
      <h2>Manage Questions (Exam ID: {id})</h2>

      <textarea
        placeholder="Question text"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      {["A","B","C","D"].map(opt => (
        <input
          key={opt}
          placeholder={`Option ${opt}`}
          value={options[opt]}
          onChange={e =>
            setOptions(prev => ({ ...prev, [opt]: e.target.value }))
          }
          style={{ width: "100%", marginBottom: "5px" }}
        />
      ))}

      <select
        value={correct}
        onChange={e => setCorrect(e.target.value)}
      >
        <option value="A">Correct Option: A</option>
        <option value="B">Correct Option: B</option>
        <option value="C">Correct Option: C</option>
        <option value="D">Correct Option: D</option>
      </select>

      <br /><br />

      <button onClick={addQuestion}>Add Question</button>

      <hr />

      <h3>Existing Questions</h3>

      {questions.length === 0 ? (
        <p>No questions added yet.</p>
      ) : (
        <ol>
          {questions.map(q => (
            <li key={q.id}>{q.question}</li>
          ))}
        </ol>
      )}
    </div>
  );
}
