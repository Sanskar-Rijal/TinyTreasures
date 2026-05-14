import { useMutation } from "@tanstack/react-query";
import { askQuestion } from "../services/apiChat";
import toast from "react-hot-toast";

function useChat() {
  const { mutate: sendMessage, isPending: isLoading } = useMutation({
    mutationFn: askQuestion,
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { sendMessage, isLoading };
}

export default useChat;
