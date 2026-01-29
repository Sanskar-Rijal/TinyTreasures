import { formatDate } from "../../utils/Helpers";
import Badge from "../../ui/Badge";
import { FaRegClock } from "react-icons/fa";
import OrderImageNameItem from "./OrderImageNameItem";

function OrderItem({ order }) {
  return (
    <div className="mt-5 rounded-lg border border-gray-200 bg-white/80 shadow-lg">
      <div className="space-y-6">
        {/* order header  */}
        <div className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 font-semibold text-gray-900">
              Id-{order.id}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <p className="text-gray-600">
                Placed on {formatDate(order.createdAt)}
              </p>

              <p className="text-gray-600">{order.orderItems.length} item</p>

              <p className="font-semibold text-gray-900">
                Rs {order.totalPrice}
              </p>
            </div>
          </div>

          <Badge variant="status">
            <FaRegClock className="h-4 w-4" />
            {order.orderStatus}
          </Badge>
        </div>
        {/* drawing one line */}
        <div className="mb-4 space-y-4 border-t border-gray-200">
          {/* show orderItems here  */}
          <div className="p-6">
            {order.orderItems.map((item) => (
              <OrderImageNameItem key={item.id} item={item} />
            ))}
          </div>
        </div>
        {/* drawing one line and show shipping information  */}
        <div className="mb-4 space-y-4 border-t border-gray-200">
          <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
            {/* shipping address  */}
            <div>
              <h3 className="mb-2 text-sm font-semibold text-gray-600 sm:text-lg">
                Shipping Address
              </h3>
              <p className="text-sm text-gray-900">
                Name: {order.shippingInfo.fullName}
                <br />
                Address: {order.shippingInfo.address}
                <br />
                Country: {order.shippingInfo.country}
              </p>
            </div>
            {/* Tracking Information */}
            <div>
              <h3 className="mb-2 text-sm font-semibold text-gray-600 sm:text-lg">
                Tracking Information
              </h3>
              <p className="mb-2 text-sm text-gray-900">
                Tracking: <span className="text-purple-600">{order.id}</span>
              </p>
              <p className="text-sm text-gray-600">
                Estimated Delivery:{" "}
                {order.estimatedDelivery
                  ? formatDate(order.estimatedDelivery)
                  : "Not available"}
              </p>
              <p className="mb-2 text-sm text-gray-900">
                PaymentInfo:{" "}
                <span className="text-purple-600">
                  {order.paymentInfo.status}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
