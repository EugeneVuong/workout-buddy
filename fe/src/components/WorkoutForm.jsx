import usePrivateAxios from "../hooks/usePrivateAxios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const workoutSchema = z.object({
  name: z.string(),
  type: z.string(),
  muscle: z.string(),
  equipment: z.string(),
  difficulty: z.string(),
  instructions: z.string(),
  sets: z.coerce.number(),
});

const WorkoutForm = () => {
  const privateAxios = usePrivateAxios();
  const queryClient = useQueryClient();

  const addExercise = useMutation({
    mutationFn: async (newExercise) => {
      return await privateAxios.post("/exercises", newExercise);
    },
    onSuccess: (data) => {
      // Assuming the server returns the updated list of exercises
      queryClient.setQueriesData(["workouts"], data);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { error, isSubmitting },
    reset,
    getValues,
  } = useForm({ resolver: zodResolver(workoutSchema) });

  const onSubmit = async (data) => {
    addExercise.mutate(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Name" />
      <input {...register("type")} placeholder="Type" />
      <input {...register("muscle")} placeholder="Muscle" />
      <input {...register("equipment")} placeholder="Equipment" />
      <input {...register("difficulty")} placeholder="Difficulty" />
      <textarea {...register("instructions")} placeholder="Instruction" />
      <input {...register("sets")} type="number" placeholder="Sets" />
      <button disabled={isSubmitting}>Submit</button>
    </form>
  );
};

export default WorkoutForm;
