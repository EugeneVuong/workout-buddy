import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../services/axiosInstance";
import WorkoutForm from "../components/WorkoutForm";
import Workouts from "../components/Workouts";
const Home = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get("/auth/logout", {
        withCredentials: true,
      });
      setAuth({});
      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Home</h1>
      {/* <WorkoutForm /> */}
      <button onClick={handleLogout}>Logout</button>
      <Workouts />
    </>
  );
};

export default Home;
