import axios from "../services/axiosInstance";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refreshToken = async () => {
    const response = await axios.get("/auth/refreshtoken");
    const accessToken = response.data.accessToken;
    setAuth((prev) => {
      return {
        ...prev,
        accessToken,
      };
    });
    return accessToken;
  };

  return refreshToken;
};

export default useRefreshToken;
