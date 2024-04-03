import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../services/axiosInstance";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "/auth/login",
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      );
      const authData = response.data;
      setAuth(authData);
      setUsername("");
      setPassword("");
      navigate("/", { replace: true });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={(event) => handleLogin(event)}>
        <input
          type="input"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {error && <span>{error.message}</span>}
        <button>Sign In</button>
      </form>
      <Link to="/register">Need an account?</Link>
    </>
  );
};

export default Login;
