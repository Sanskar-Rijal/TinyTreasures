import { useSearchParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import useKhaltiVerifyPayment from "../hooks/useKhaltiVerifyPayment";
import { useEffect } from "react";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const pidx = searchParams.get("pidx");
  const orderId = searchParams.get("purchase_order_id");
  const { verifyPayment } = useKhaltiVerifyPayment();
  //useEffect to make immediate api call verify payment and naviate somewhere
  useEffect(
    function () {
      if (pidx) {
        verifyPayment({ pidx, orderId });
      }
    },
    [pidx, verifyPayment],
  );

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto flex max-w-md flex-col items-center">
        <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-purple-50 md:h-34 md:w-34">
          <span className="text-5xl">🍀</span>
        </div>
        <h2 className="mb-4 text-xl font-semibold text-gray-900 sm:text-2xl md:text-3xl">
          Verifying Payment
        </h2>
        <p className="text-gray-600">
          Please wait while we verify your payment.
        </p>
        <Spinner />
      </div>
    </div>
  );
}

export default PaymentSuccess;
