import { useMutation } from "@tanstack/react-query";
import { initiateKhaltiPayment } from "../services/apiOrder";

export default function useInitiatePayment() {
  const { isPending, mutate: initiatePayment } = useMutation({
    mutationFn: initiateKhaltiPayment,
    onSuccess: (res) => {
      console.log(res);
      window.location.href = res.message.payment_url; //Redirect to khalti payment paeg
    },
  });
  return { isPending, initiatePayment };
}
