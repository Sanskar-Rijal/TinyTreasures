function LastUpdated() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white/80 p-6">
      <div>
        <p className="mb-6 text-sm text-gray-600">Last updated: April 2024</p>
      </div>
      <p className="mb-4 leading-relaxed text-gray-600">
        Refunds will be issued to your original payment method. Please allow 5-7
        business days for the refund to appear in your account.
      </p>
      <p className="mb-4 leading-relaxed text-gray-600">
        If you paid with a credit card, the refund may take an additional 1-2
        billing cycles to appear on your statement, depending on your card
        issuer.
      </p>
    </div>
  );
}

export default LastUpdated;
