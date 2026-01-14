import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../services/apiUser";
import toast from "react-hot-toast";

export default function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { isPending, mutate: updateNameEmail } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mySelf"],
      });
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });
  return { updateNameEmail, isPending };
}
