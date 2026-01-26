import BackToXyz from "../ui/BackToXyz";
import { FaClock, FaSearch, FaTruck } from "react-icons/fa";

function ShippingInfo() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BackToXyz label="Move Back" />

      <h1 className="mb-8 text-xl font-semibold text-gray-900 sm:text-2xl md:text-3xl">
        Shipping Information
      </h1>
      <div className="max-w-4xl space-y-7">
        <div className="rounded-lg border border-gray-200 bg-white/80 p-6">
          {/* Heading and icon for shippping  */}
          <div className="flex items-center gap-2 pb-8">
            <FaTruck className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg text-gray-900 sm:text-xl">
              Shipping Methods
            </h3>
          </div>

          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-2">
              <h3 className="mb-2 text-lg text-gray-900 sm:text-xl">
                Standard Shipping
              </h3>
              <p className="mb-2 text-sm text-gray-600">
                Delivery in 5-7 business days • Rs 120 (FREE on orders over Rs
                1500)
              </p>
            </div>

            <div className="border-b border-gray-200 pb-2">
              <h3 className="mb-2 text-lg text-gray-900 sm:text-xl">
                Express Shipping
              </h3>
              <p className="mb-2 text-sm text-gray-600">
                Delivery in 2-3 business days • Rs 500
              </p>
            </div>

            <div className="border-b border-gray-200 pb-2">
              <h3 className="mb-2 text-lg text-gray-900 sm:text-xl">
                Overnight Shipping
              </h3>
              <p className="mb-2 text-sm text-gray-600">
                Next business day delivery • Rs 1000
              </p>
            </div>
          </div>
        </div>
        {/* Processing time  */}
        <div className="rounded-lg border border-gray-200 bg-white/80 p-6">
          {/* card title  */}
          <div className="flex items-center gap-2 pb-8">
            <FaClock className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg text-gray-900 sm:text-xl">
              Processing Time
            </h3>
          </div>
          <p className="mb-4 text-gray-600">
            Orders are typically processed within 1-2 business days. Orders
            placed on weekends or holidays will be processed on the next
            business day.
          </p>
          <p className="text-gray-600">
            You will receive an email confirmation when your order ships with
            tracking information.
          </p>
        </div>
        {/* Order Tracking  */}
        <div className="rounded-lg border border-gray-200 bg-white/80 p-6">
          {/* card title  */}
          <div className="flex items-center gap-2 pb-8">
            <FaSearch className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg text-gray-900 sm:text-xl">Order Tracking</h3>
          </div>
          <p className="mb-4 leading-relaxed text-gray-600">
            Once your order ships, you'll receive a tracking number via email.
            Use this number to track your package's journey. You can also track
            your orders by logging into your account and viewing your order
            history.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ShippingInfo;
