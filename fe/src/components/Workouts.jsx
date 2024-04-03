import { useQuery } from "@tanstack/react-query";
import usePrivateAxios from "../hooks/usePrivateAxios";

const Workouts = () => {
  const privateAxios = usePrivateAxios();

  const { isLoading, error, data } = useQuery({
    queryKey: ["workouts"],
    queryFn: async () => {
      const response = await privateAxios.get("/exercises");
      return response.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return (
    <>
      {data &&
        data.map((exercise) => {
          <div>{exercise.name}</div>;
        })}
    </>
  );
};

export default Workouts;
