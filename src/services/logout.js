export function logout(navigate) {
  localStorage.removeItem("user");
  localStorage.removeItem("answers");
  localStorage.removeItem("time");

  navigate("/", { replace: true });
}

