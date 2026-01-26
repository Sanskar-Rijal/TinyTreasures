function UseInformation() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white/80 p-6">
      <div className="pb-8">
        <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
          How We Use Your Information
        </h3>
      </div>

      <div>
        <p className="mb-4 leading-relaxed text-gray-600">
          We use your information to:
        </p>
        <ul className="mt-2 ml-6 list-disc space-y-1 text-gray-600">
          <li>Process and fulfill your orders</li>
          <li>Communicate with you about your orders and account</li>
          <li>Provide customer support</li>
          <li>Send you promotional emails (with your consent)</li>
          <li>Improve our website and services</li>
          <li>Prevent fraud and enhance security</li>
          <li>Comply with legal obligations</li>
        </ul>
      </div>
    </div>
  );
}

export default UseInformation;
