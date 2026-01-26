import { FaRegSadCry } from "react-icons/fa";
import BackToXyz from "../ui/BackToXyz";
import { LuRotateCcw } from "react-icons/lu";
import { returnProcess } from "../utils/Data";
import ReturnItem from "../features/Returns and Refund/ReturnItem";
import { FcProcess } from "react-icons/fc";
import { FiPackage } from "react-icons/fi";
import Button from "../ui/Button";

function Returns() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BackToXyz label={"Move Back"} />
      <h1 className="mb-8 text-xl font-semibold text-gray-900 sm:text-2xl md:text-3xl">
        Returns & Refunds
      </h1>
      <div className="max-w-4xl space-y-6">
        {/* 1st card 30 days return policy  */}
        <div className="rounded-lg border border-gray-200 bg-white/80 p-6">
          {/* card title  */}
          <div className="flex items-center gap-2 pb-8">
            <LuRotateCcw className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg text-gray-900 sm:text-xl">
              7-Day Return Policy
            </h3>
          </div>
          <p className="mb-4 leading-relaxed text-gray-600">
            We want you to be completely satisfied with your purchase. If you're
            not happy with your order, you can return it within 7 days of
            delivery for a full refund or exchange.
          </p>
          <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
            <p className="text-sm text-purple-900">
              <strong>Please note:</strong> Items must be in original condition
              with all packaging, accessories, and documentation.
            </p>
          </div>
        </div>
        {/* 2nd card how to return an item  */}
        <div className="rounded-lg border border-gray-200 bg-white/80 p-6">
          {/* card title  */}
          <div className="flex items-center gap-2 pb-8">
            <FaRegSadCry className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg text-gray-900 sm:text-xl">
              How to return an item
            </h3>
          </div>
          <div className="space-y-3">
            {returnProcess.map((item) => (
              <ReturnItem key={item.step} returnProcess={item} />
            ))}
          </div>
        </div>
        {/* 3rd card, if damaged or incorrect item is received  */}
        <div className="rounded-lg border border-gray-200 bg-white/80 p-6">
          {/* card title  */}
          <div className="flex items-center gap-2 pb-8">
            <FiPackage className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg text-gray-900 sm:text-xl">
              Damaged or Defective Items
            </h3>
          </div>
          <p className="mb-4 leading-relaxed text-gray-600">
            If you receive a damaged or defective product, please contact us
            immediately with photos of the damage. We will arrange for a
            replacement or full refund at no cost to you.
          </p>
          <p className="mb-4 leading-relaxed text-gray-600">
            For damaged items, you do not need to return the product unless we
            specifically request it.
          </p>
        </div>
        {/* Refund Process  */}
        <div className="rounded-lg border border-gray-200 bg-white/80 p-6">
          {/* card title  */}
          <div className="flex items-center gap-2 pb-8">
            <FcProcess className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg text-gray-900 sm:text-xl">
              Refund Processing
            </h3>
          </div>
          <p className="mb-4 leading-relaxed text-gray-600">
            Refunds will be issued to your original payment method. Please allow
            5-7 business days for the refund to appear in your account.
          </p>
          <p className="mb-4 leading-relaxed text-gray-600">
            If you paid with a credit card, the refund may take an additional
            1-2 billing cycles to appear on your statement, depending on your
            card issuer.
          </p>
        </div>
        {/* Question about returns? */}
        <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
          <div className="flex flex-col items-center justify-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
              Questions about returns?
            </h3>
            <p className="mb-4 leading-relaxed text-gray-600">
              Our customer support team is here to help!
            </p>
            <Button
              to="/contactUs"
              size="lg"
              className="inline-flex cursor-pointer items-center justify-center rounded-full text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Returns;
