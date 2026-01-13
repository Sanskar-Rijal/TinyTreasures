function InformationSharing() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white/80 p-6">
      <div className="pb-8">
        <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
          Information Sharing
        </h3>
      </div>

      <div>
        <p className="mb-4 leading-relaxed text-gray-600">
          We do not sell your personal information. We may share your
          information with:
        </p>
        <ul className="mt-2 ml-6 list-disc space-y-1 text-gray-600">
          <li>
            Service providers who assist in our operations (shipping, payment
            processing, etc.)
          </li>
          <li>
            Law enforcement or regulatory authorities when required by law
          </li>
          <li>Business partners with your explicit consent</li>
        </ul>
      </div>
    </div>
  );
}

export default InformationSharing;
