import { PiPackage } from "react-icons/pi";

function OrderHistoryCard() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white/80">
      <div className="p-6 pb-4">
        <div className="mb-10 flex items-center justify-center gap-4">
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

export default OrderHistoryCard;
