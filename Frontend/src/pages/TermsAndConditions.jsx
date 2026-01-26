import { FiFileText } from "react-icons/fi";
import BackToXyz from "../ui/BackToXyz";
import { termsAndConditions } from "../utils/Data";
import UsableCard from "../features/Returns and Refund/UsableCard";

function TermsAndConditions() {
  return (
    <div className="container mx-auto px-4 py-6">
      <BackToXyz label="Move Back" />
      <div className="mb-8 flex items-center gap-3">
        <FiFileText className="h-8 w-8 text-purple-600" />
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl md:text-3xl">
          Terms and Conditions
        </h1>
      </div>
      <div className="max-w-4xl space-y-4">
        <div className="rounded-lg border border-gray-200 bg-white/80 p-6">
          <div>
            <p className="mb-6 text-sm text-gray-600">
              Last updated: April 2024
            </p>
          </div>
          <p className="mb-4 leading-relaxed text-gray-600">
            Welcome to TinyTreasures. By accessing and using our website, you
            agree to be bound by these Terms and Conditions. Please read them
            carefully.
          </p>
        </div>
        {termsAndConditions.map((item, index) => (
          <UsableCard
            key={index}
            title={item.title}
            index={index}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}

export default TermsAndConditions;
