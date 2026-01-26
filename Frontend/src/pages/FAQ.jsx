import { FiHelpCircle } from "react-icons/fi";
import BackToXyz from "../ui/BackToXyz";
import FaqItem from "../features/FAQ/FaqItem";
import { faqs } from "../utils/Data";

function FAQ() {
  return (
    <div className="container mx-auto px-4 py-6">
      <BackToXyz label="Move Back" />
      <h1 className="mb-8 text-xl font-semibold text-gray-900 sm:text-2xl md:text-3xl">
        Frequently Asked Questions
      </h1>
      <div className="max-w-4xl space-y-4">
        {faqs.map((faqs) => (
          <FaqItem key={faqs.question} faqs={faqs} />
        ))}
      </div>
    </div>
  );
}

export default FAQ;
