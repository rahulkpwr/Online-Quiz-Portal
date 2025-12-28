import { useEffect, useState } from "react";
import API from "../services/api";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const loadCategories = () => {
    API.get("/get_categories.php")
      .then(res => setCategories(res.data))
      .catch(() => setCategories([]));
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const addCategory = async () => {
    if (!name.trim()) return alert("Enter category name");

    const res = await API.post("/add_category.php", { name });

    if (res.data.success) {
      setName("");
      loadCategories();
    } else {
      alert(res.data.error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📚 Exam Categories</h2>

      <input
        placeholder="Category name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={addCategory} style={{ marginLeft: "10px" }}>
        Add
      </button>

      <hr />

      <ul>
        {categories.map(c => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}
