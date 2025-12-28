import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/admin_login.php", {
        username,
        password
      });

      if (res.data.success) {
        localStorage.setItem("admin", JSON.stringify(res.data.admin));
        navigate("/admin/dashboard", { replace: true });
      } else {
        alert("Invalid admin credentials");
      }
    } catch {
      alert("Server error");
    }
  };

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={handleLogin}>
        <h2 style={styles.title}>🔐 Admin Login</h2>

        <input
          style={styles.input}
          placeholder="Admin Username"
          value={username}
          required
          onChange={e => setUsername(e.target.value)}
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
    background: "linear-gradient(135deg, #020617, #0f172a)",
    fontFamily: "Segoe UI, sans-serif"
  },
  card: {
    background: "#020617",
    color: "white",
    padding: "35px",
    width: "360px",
    borderRadius: "12px",
    boxShadow: "0 15px 30px rgba(0,0,0,0.6)",
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
    border: "none",
    fontSize: "14px"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px"
  }
};
