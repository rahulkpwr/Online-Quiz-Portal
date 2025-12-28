import { useNavigate } from "react-router-dom";

export default function Dashboard({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/", { replace: true });
  };

  return (
    <div style={styles.layout}>
      <aside style={styles.sidebar}>
        <h3>🛠 Admin</h3>

        <button onClick={() => navigate("/admin/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/admin/users")}>Users</button>
        <button onClick={() => navigate("/admin/create-exam")}>Create Exam</button>
        <button onClick={() => navigate("/admin/results")}>Results</button>

        <button style={styles.logout} onClick={logout}>Logout</button>
      </aside>

      <main style={styles.main}>
        {children || <h2>Welcome Admin 👋</h2>}
      </main>
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial"
  },
  sidebar: {
    width: "220px",
    background: "#1e293b",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  logout: {
    marginTop: "auto",
    background: "red",
    color: "white"
  },
  main: {
    flex: 1,
    padding: "30px",
    background: "#f1f5f9"
  }
};
