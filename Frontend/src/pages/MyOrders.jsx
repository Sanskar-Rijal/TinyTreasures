import useMyOrder from "../hooks/useMyOrder";
import Loader from "../ui/Loader";
import { useSelector } from "react-redux";
import Button from "../ui/Button";
import PleaseLogin from "../ui/PleaseLogin";
import OrderItem from "../features/Order/OrderItem";

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
        myOrders.map((order) => <OrderItem key={order.id} order={order} />)}
    </div>
  );
}

export default MyOrders;
