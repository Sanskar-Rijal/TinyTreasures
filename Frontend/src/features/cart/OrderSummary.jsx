import { useSelector } from "react-redux";
import Button from "../../ui/Button";

function OrderSummary({ label, to = "" }) {
  const subTotal = useSelector((state) => state.cart.subTotal);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const tax = useSelector((state) => state.cart.tax);
  const shippingPrice = useSelector((state) => state.cart.shippingPrice);

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24 rounded-lg border border-gray-200 bg-white/80">
        <div className="p-6">
          <h3 className="mb-6 text-lg font-semibold text-gray-900 sm:text-xl">
            Order Summary
          </h3>
          <div className="mb-6 space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>Rs {subTotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>Rs {shippingPrice}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>Rs {tax}</span>
            </div>
            <div className="border-t border-gray-200 pt-3">
              <div>
                <div className="flex justify-between text-gray-600">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-xl text-purple-600">
                    Rs {totalPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Proceed to Checkout Button  */}
          <Button
            to={to}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            size="lg"
          >
            {label}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
