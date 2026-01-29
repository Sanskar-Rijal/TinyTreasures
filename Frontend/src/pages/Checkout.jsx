import { LuMapPin } from "react-icons/lu";
import BackToXyz from "../ui/BackToXyz";
import OrderSummary from "../features/cart/OrderSummary";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import useInitiatePayment from "../hooks/useInitiatePayment";
import Loader from "../ui/Loader";
import { useEffect, useRef } from "react";

function Checkout() {
  const formRef = useRef(null);

  // Clear form when user hits back button
  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset();
    }
  }, []);
  const cartItems = useSelector((state) => state.cart.orderItems);
  const itemsPrice = useSelector((state) => state.cart.subTotal);
  const taxPrice = useSelector((state) => state.cart.tax);
  const shippingPrice = useSelector((state) => state.cart.shippingPrice);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const { isPending: isInitiating, initiatePayment } = useInitiatePayment();
  //using react hook form
  const { register, handleSubmit } = useForm();

  function handlePayment(formData) {
    //when user clicks on proceed to checkout button
    const payload = {
      shippingInfo: formData,
      orderItems: cartItems,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    };
    initiatePayment(payload);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {isInitiating && <Loader />}
      {/* back Button  */}
      <BackToXyz label={"Back to Cart"} />
      <h1 className="mb-4 text-xl font-semibold text-gray-900 sm:text-2xl md:text-3xl">
        Checkout
      </h1>
      <form
        ref={formRef}
        autoComplete="off"
        onSubmit={handleSubmit(handlePayment)}
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white/80 p-6">
              {/* checkout form header  */}
              <div className="mb-10 flex items-center gap-4">
                <LuMapPin className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg sm:text-xl md:text-2xl">
                  Shipping Information{" "}
                </h3>
              </div>

              {/* checkout form body  */}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* full name  */}
                <div className="space-y-2">
                  <label
                    htmlFor="fullName"
                    className="block font-semibold text-gray-900"
                  >
                    FullName
                  </label>
                  <input
                    {...register("fullName")}
                    id="fullName"
                    className="w-full rounded-xl border border-gray-200 bg-white px-2 py-2 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    type="text"
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                {/* phone no  */}

                <div className="space-y-2">
                  <label
                    htmlFor="phoneNo"
                    className="block font-semibold text-gray-900"
                  >
                    PhoneNumber
                  </label>
                  <input
                    {...register("phoneNo")}
                    id="phoneNo"
                    className="w-full rounded-xl border border-gray-200 bg-white px-2 py-2 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    type="number"
                    required
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              {/* Email ADdresss */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block font-semibold text-gray-900"
                >
                  Email
                </label>
                <input
                  {...register("email")}
                  id="email"
                  className="w-full rounded-xl border border-gray-200 bg-white px-2 py-2 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  type="email"
                  required
                  placeholder="Enter your email address"
                />
              </div>
              {/* StreetADdress */}
              <div className="space-y-2">
                <label
                  htmlFor="address"
                  className="block font-semibold text-gray-900"
                >
                  Street Address
                </label>
                <input
                  {...register("address")}
                  id="address"
                  className="w-full rounded-xl border border-gray-200 bg-white px-2 py-2 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  type="text"
                  required
                  placeholder="Enter your street address"
                />
              </div>
              {/* city state zipcode */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* City  */}
                <div className="space-y-2">
                  <label
                    htmlFor="city"
                    className="block font-semibold text-gray-900"
                  >
                    City
                  </label>
                  <input
                    {...register("city")}
                    id="city"
                    className="w-full rounded-xl border border-gray-200 bg-white px-2 py-2 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    type="text"
                    required
                    placeholder="Enter your city"
                  />
                </div>
                {/* zip code  */}
                <div className="space-y-2">
                  <label
                    htmlFor="zipCode"
                    className="block font-semibold text-gray-900"
                  >
                    Zip Code
                  </label>
                  <input
                    {...register("zipCode")}
                    id="zipCode"
                    className="w-full rounded-xl border border-gray-200 bg-white px-2 py-2 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    type="text"
                    required
                    placeholder="Enter your zip code"
                  />
                </div>
                {/* country  */}
                <div className="space-y-2">
                  <label
                    htmlFor="country"
                    className="block font-semibold text-gray-900"
                  >
                    Country
                  </label>
                  <input
                    {...register("country")}
                    id="country"
                    className="w-full rounded-xl border border-gray-200 bg-white px-2 py-2 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    type="text"
                    required
                    placeholder="Enter your country"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Order Summary  */}
          <OrderSummary label={"Pay with Khalti"} type={"submit"} />
        </div>
      </form>
    </div>
  );
}

export default Checkout;
