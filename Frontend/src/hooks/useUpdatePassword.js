import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../services/apiUser";
import toast from "react-hot-toast";

export default function useUpdatePassword() {
  const { mutate: updatePass, isPending } = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success("Password Updated Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updatePass, isPending };
}
