import { BrowserRouter, Routes, Route } from "react-router-dom";

/* HOME */
import Home from "./pages/Home";

/* USER */
import Login from "./pages/Login";
import Register from "./pages/Register";
import ExamList from "./pages/ExamList";
import Exam from "./pages/Exam";
import Result from "./pages/Result";
import History from "./pages/History";

/* ADMIN */
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import Users from "./admin/Users";
import Categories from "./admin/Categories";
import CreateExam from "./admin/CreateExam";
import AddQuestions from "./admin/AddQuestions";
import Results from "./admin/Results";

/* PROTECTION */
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LANDING */}
        <Route path="/" element={<Home />} />

        {/* USER */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/exams"
          element={
            <ProtectedRoute>
              <ExamList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/exam/:id"
          element={
            <ProtectedRoute>
              <Exam />
            </ProtectedRoute>
          }
        />

        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <Dashboard />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminProtectedRoute>
              <Dashboard>
                <Users />
              </Dashboard>
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <AdminProtectedRoute>
              <Dashboard>
                <Categories />
              </Dashboard>
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/create-exam"
          element={
            <AdminProtectedRoute>
              <Dashboard>
                <CreateExam />
              </Dashboard>
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/questions/:id"
          element={
            <AdminProtectedRoute>
              <Dashboard>
                <AddQuestions />
              </Dashboard>
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/results"
          element={
            <AdminProtectedRoute>
              <Dashboard>
                <Results />
              </Dashboard>
            </AdminProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
