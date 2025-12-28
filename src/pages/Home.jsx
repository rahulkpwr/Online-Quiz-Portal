import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎓 Online Quiz Portal</h1>
        <p style={styles.subtitle}>
          Login to continue
        </p>

        <button
          style={{ ...styles.btn, background: "#2563eb" }}
          onClick={() => navigate("/login")}
        >
          👨‍🎓 User Login
        </button>

        <button
          style={{ ...styles.btn, background: "#0f172a" }}
          onClick={() => navigate("/admin/login")}
        >
          🔐 Admin Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e3a8a, #0f172a)",
    fontFamily: "Segoe UI, sans-serif"
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    width: "360px",
    textAlign: "center",
    boxShadow: "0 15px 30px rgba(0,0,0,0.3)"
  },
  title: {
    marginBottom: "10px"
  },
  subtitle: {
    marginBottom: "25px",
    color: "#555"
  },
  btn: {
    width: "100%",
    padding: "12px",
    marginTop: "12px",
    fontSize: "16px",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};
