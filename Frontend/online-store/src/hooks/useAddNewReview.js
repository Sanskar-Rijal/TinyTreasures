import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewReview } from "../services/apiReview";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function useAddNewReview({ onClose }) {
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const { isPending, mutate: newReview } = useMutation({
    mutationFn: addNewReview,
    onSuccess: () => {
      toast.success("Review Added Successfully 🤪");
      //reload the page to see the new review
      queryClient.invalidateQueries({
        queryKey: ["productsById", productId],
      });
      onClose?.(); //close the review form
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isPending, newReview };
}
