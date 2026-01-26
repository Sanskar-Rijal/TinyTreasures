function Rights() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white/80 p-6">
      <div className="pb-8">
        <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
          Your Rights
        </h3>
      </div>

      <div>
        <p className="mb-4 leading-relaxed text-gray-600">
          You have the right to:
        </p>
        <ul className="mt-2 ml-6 list-disc space-y-1 text-gray-600">
          <li>Access and review your personal information</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of your information</li>
          <li>Opt-out of marketing communications</li>
          <li>Object to certain processing of your information</li>
        </ul>
      </div>
    </div>
  );
}

export default Rights;
