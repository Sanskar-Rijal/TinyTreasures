import { useSelector } from "react-redux";
import Button from "../ui/Button";
import BackToXyz from "../ui/BackToXyz";
import CartItem from "../features/cart/CartItem";
import OrderSummary from "../features/cart/OrderSummary";

function Cart() {
  //Getting items from cart
  const cartItems = useSelector((state) => state.cart.orderItems);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-purple-50 md:h-34 md:w-34">
            <span className="text-5xl">🛒</span>
          </div>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 sm:text-2xl md:text-3xl">
            Your cart is empty
          </h2>
          <p className="mb-8 text-gray-600">
            Add some products to get started!
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
      {/* Back Button  */}
      <BackToXyz label="Back to Products" />
      <h1 className="mb-4 text-xl font-semibold text-gray-900 sm:text-2xl md:text-3xl">
        Shopping Cart ({cartItems.length} items)
      </h1>
      {/* show items and order summary in grid layout */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Cart Item  */}
        <div className="space-y-4 md:col-span-2">
          {cartItems.map((item) => (
            <CartItem key={item.product} item={item} />
          ))}
        </div>
        {/* order summary */}
        <OrderSummary label={"Proceed to Checkout"} to={"/order/checkout"} />
      </div>
    </div>
  );
}

export default Cart;
