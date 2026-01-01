import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../services/apiUser";
import toast from "react-hot-toast";

export default function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: LoginUser,
    onSuccess: () => {
      toast.success("Login Successful");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { login, isPending };
}
