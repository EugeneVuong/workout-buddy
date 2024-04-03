import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../services/axiosInstance";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/auth/register", {
        name: name,
        username: username,
        password: password,
      });
      setName("");
      setUsername("");
      setPassword("");
      setError(null);
      navigate("/login");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={(event) => handleRegister(event)}>
        <input
          type="input"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
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
        <button>Sign Up</button>
      </form>
      <Link to="/login">Have an account?</Link>
    </>
  );
};

export default Register;
