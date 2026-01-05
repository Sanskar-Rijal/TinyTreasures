import { useSelector } from "react-redux";
import Button from "../ui/Button";
import BackToXyz from "../ui/BackToXyz";
import QuantitySelector from "../ui/QuantitySelector";
import { FiTrash } from "react-icons/fi";

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
            <div
              key={item.product}
              className="mx-4 rounded-lg border border-gray-200 bg-white/80"
            >
              <div className="p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="mb-5 h-55 overflow-hidden sm:h-34 sm:w-34">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col justify-center">
                      <h3 className="mb-2 truncate text-lg font-semibold text-gray-900 sm:text-xl">
                        {item.name}
                      </h3>
                      <p className="mb-5 text-sm text-gray-600">
                        {item.category}
                      </p>
                      {/* Increase or Decrease Quantity */}
                      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <div className="self-start">
                          <QuantitySelector />
                        </div>

                        <div className="flex w-full items-center justify-between gap-3 sm:justify-end">
                          <div>
                            <p className="text-lg text-purple-600">
                              Rs {(item.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-600">
                              {item.price.toFixed(2)} each
                            </p>
                          </div>
                          <Button
                            size="lg"
                            className="inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium text-red-600 transition-all hover:bg-red-50 hover:text-red-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                            variant="ghost"
                          >
                            <FiTrash className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* order summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-lg border border-gray-200 bg-white/80">
            <div className="p-6">
              <h3 className="mb-6 text-lg font-semibold text-gray-900 sm:text-xl">
                Order Summary
              </h3>
              <div className="mb-6 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs 25000</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Rs 25000</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>Rs 25000</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div>
                    <div className="flex justify-between text-gray-600">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="text-xl text-purple-600">Rs 25000</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Proceed to Checkout Button  */}
              <Button
                className="inline-flex w-full items-center justify-center gap-2 rounded-full text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                size="lg"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
