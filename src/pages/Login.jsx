import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login.php", { email, password });

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/exams", { replace: true });
      } else {
        alert(res.data.error || "Login failed");
      }
    } catch {
      alert("Server error");
    }
  };

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={login}>
        <h2 style={styles.title}>👨‍🎓 User Login</h2>

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
        />

        <button style={styles.button}>Login</button>

        <p style={styles.text}>
          New user? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #2563eb, #1e3a8a)",
    fontFamily: "Segoe UI, sans-serif"
  },
  card: {
    background: "white",
    padding: "35px",
    width: "360px",
    borderRadius: "12px",
    boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
    textAlign: "center"
  },
  title: {
    marginBottom: "20px"
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px"
  },
  text: {
    marginTop: "15px",
    fontSize: "14px"
  }
};
