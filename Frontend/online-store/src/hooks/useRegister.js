import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/apiUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useRegister() {
  const navigate = useNavigate();
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Registration Successful! Please Login.");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { signUp, isPending };
}

export default useRegister;
