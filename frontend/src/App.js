import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Books from "./pages/Books";
import ReturnBook from "./pages/ReturnBook";
import AdminDashboard from "./pages/AdminDashboard";
import { Navigate } from "react-router-dom";

const App = () => {
  // Retrieve isAdmin flag from localStorage (or session storage)
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin")) || false;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
        />
        <Route path="/books" element={<Books />} />
        <Route path="/return" element={<ReturnBook />} />
      </Routes>
    </Router>
  );
};

export default App;
