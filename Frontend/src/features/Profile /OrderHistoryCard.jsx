import { PiPackage } from "react-icons/pi";
import { useSelector } from "react-redux";
import Button from "../../ui/Button";

function OrderHistoryCard() {
  const numberofOrders = useSelector((state) => state.user.user.numberofOrders);

  if (numberofOrders === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white/80">
        <div className="p-6 pb-4">
          <div className="mb-10 flex items-center gap-4">
            <PiPackage className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900 md:text-xl">
              Order History
            </h3>
          </div>
          {/* if you havent placed any orders  */}
          <div className="flex flex-col items-center justify-end">
            <PiPackage className="mb-4 h-15 w-15 text-gray-400" />
            <p className="text-gray-600">No orders yet</p>
          </div>
        </div>
      </div>
    );
  }
  if (numberofOrders > 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white/80">
        <div className="flex h-full flex-col p-6 pb-4">
          <div className="mb-10 flex items-center gap-4">
            <PiPackage className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900 md:text-xl">
              Order History
            </h3>
          </div>
          {/* if you havent placed any orders  */}
          <p className="mb- text-lg text-gray-600">
            You have {numberofOrders} order. Please click the button below to
            view all your orders.
          </p>
          <div className="mt-auto gap-4">
            <Button
              size="lg"
              to="/userProfile/myOrders"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              View All Orders
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderHistoryCard;
