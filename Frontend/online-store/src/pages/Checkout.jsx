import { LuMapPin } from "react-icons/lu";
import BackToXyz from "../ui/BackToXyz";
import OrderSummary from "../features/cart/OrderSummary";

function Checkout() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* back Button  */}
      <BackToXyz label={"Back to Cart"} />
      <h1 className="mb-4 text-xl font-semibold text-gray-900 sm:text-2xl md:text-3xl">
        Checkout
      </h1>
      <form>
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
                    id="city"
                    className="w-full rounded-xl border border-gray-200 bg-white px-2 py-2 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    type="text"
                    required
                    placeholder="Enter your city"
                  />
                </div>
                {/* State  */}
                <div className="space-y-2">
                  <label
                    htmlFor="state"
                    className="block font-semibold text-gray-900"
                  >
                    State
                  </label>
                  <input
                    id="state"
                    className="w-full rounded-xl border border-gray-200 bg-white px-2 py-2 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    type="text"
                    required
                    placeholder="Enter your state"
                  />
                </div>
                {/* zip code */}
                <div className="space-y-2">
                  <label
                    htmlFor="zipCode"
                    className="block font-semibold text-gray-900"
                  >
                    Zip Code
                  </label>
                  <input
                    id="zipCode"
                    className="w-full rounded-xl border border-gray-200 bg-white px-2 py-2 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    type="text"
                    required
                    placeholder="Enter your zip code"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Order Summary  */}
          <OrderSummary label={"Pay with Khalti"} />
        </div>
      </form>
    </div>
  );
}

export default Checkout;
