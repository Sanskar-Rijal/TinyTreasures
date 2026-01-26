import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/apiUser";
import toast from "react-hot-toast";

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      // Invalidate and refetch immediately
      queryClient.invalidateQueries({
        queryKey: ["mySelf"],
      });

      toast.success("Login Successful");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { login, isPending };
}
