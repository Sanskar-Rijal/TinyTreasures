import { useMutation } from "@tanstack/react-query";
import { verifyKhaltiPayment } from "../services/apiOrder";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../ReduxSlices/cartSlice";
import toast from "react-hot-toast";

export default function useKhaltiVerifyPayment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate: verifyPayment, isPending: isVerifying } = useMutation({
    mutationFn: verifyKhaltiPayment,
    onSuccess: () => {
      dispatch(clearCart());
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { verifyPayment, isVerifying };
}
