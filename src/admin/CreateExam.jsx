import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateExam() {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(30);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/get_categories.php")
      .then(res => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  const createExam = async () => {
    if (!title || !category) {
      alert("Fill all fields");
      return;
    }

    const res = await API.post("/add_exam.php", {
      title,
      category_id: category,
      duration_minutes: duration
    });

    if (res.data.success && res.data.exam_id) {
      // ✅ Redirect admin to add questions
      navigate(`/admin/questions/${res.data.exam_id}`);
    } else {
      alert("Failed to create exam");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Exam</h2>

      <input
        placeholder="Exam Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <select onChange={e => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <input
        type="number"
        value={duration}
        onChange={e => setDuration(e.target.value)}
      />

      <button onClick={createExam}>
        Create Exam & Add Questions
      </button>
    </div>
  );
}
