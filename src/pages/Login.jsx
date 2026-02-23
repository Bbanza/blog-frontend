import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // your axios instance

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/api/auth/login", { email, password });

      // Store JWT token in localStorage
      localStorage.setItem("token", data.token);
      
      // Optional: store username for display in Navbar
      localStorage.setItem("username", data.user.username); 

      // Optional: store user info
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("Login successful, token stored:", data.token);

      // Redirect to home or create post page
      navigate("/create-post");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
