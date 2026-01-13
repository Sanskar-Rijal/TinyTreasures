function InformationCollection() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white/80 p-6">
      <div className="pb-8">
        <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
          Information We Collect
        </h3>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="mb-3 text-lg text-gray-900 sm:text-xl">
            Personal Information
          </h3>
          <p className="mb-4 leading-relaxed text-gray-600">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="mt-2 ml-6 list-disc space-y-1 text-gray-600">
            <li>Name, email address, and phone number</li>
            <li>Shipping and billing addresses</li>
            <li>
              Payment information (processed securely through our payment
              processor)
            </li>
            <li>Order history and preferences</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-lg text-gray-900 sm:text-xl">
            Automatically Collected Information
          </h3>
          <p className="mb-4 leading-relaxed text-gray-600">
            When you visit our website, we automatically collect certain
            information, including:
          </p>
          <ul className="mt-2 ml-6 list-disc space-y-1 text-gray-600">
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>IP address and location data</li>
            <li>Browsing behavior and preferences</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InformationCollection;
