import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("userId", res.data.user._id);
      localStorage.setItem("token", res.data.token);
      navigate("/books");
    } catch (err) {
      alert("Login failed!");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Login</h2>
      <form className="form" onSubmit={handleLogin}>
        <input
          className="input"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
