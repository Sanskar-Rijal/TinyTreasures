import { FaRegClock } from "react-icons/fa";
import { formatDate } from "../utils/Helpers";
import Badge from "../ui/Badge";
import useMyOrder from "../hooks/useMyOrder";
import Loader from "../ui/Loader";
import { useSelector } from "react-redux";
import Button from "../ui/Button";
import PleaseLogin from "../ui/PleaseLogin";

function MyOrders() {
  const { isPending, data, error, isSuccess } = useMyOrder();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const myOrders = data?.message ?? [];

  if (!isAuthenticated) {
    return <PleaseLogin />;
  }

  if (myOrders.length === 0 && isSuccess) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-purple-50 md:h-34 md:w-34">
            <span className="text-5xl">🍀</span>
          </div>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 sm:text-2xl md:text-3xl">
            You do not have any orders yet!
          </h2>
          <p className="mb-8 text-gray-600">
            Start shopping to place your first order!
          </p>
          <Button
            size="lg"
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-xl font-semibold text-gray-900 sm:text-2xl md:text-3xl">
        My Orders
      </h1>
      <p className="text-gray-600">View and track all you past orders</p>

      {/* Spinner overlay */}
      {isPending && <Loader />}

      {/* display error message */}
      {error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70">
          <p className="text-center text-lg font-semibold text-red-500 sm:text-xl md:text-2xl">
            {error.message}
          </p>
        </div>
      )}

      {/* card to display order status */}

      {isSuccess &&
        myOrders.length > 0 &&
        myOrders.map((order) => (
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

                    <p className="text-gray-600">
                      {order.orderItems.length} item
                    </p>

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
                    <div className="flex gap-4" key={item.id}>
                      <img
                        className="h-20 w-20 rounded-lg object-cover"
                        src={item.image}
                        alt={item.name}
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="mb-1 truncate text-lg font-semibold text-gray-900 sm:text-xl md:text-2xl">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                        <p className="mt-1 text-sm text-gray-900">
                          Price: Rs {item.price}
                        </p>
                      </div>
                    </div>
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
                      Tracking:{" "}
                      <span className="text-purple-600">{order.id}</span>
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
        ))}
    </div>
  );
}

export default MyOrders;
