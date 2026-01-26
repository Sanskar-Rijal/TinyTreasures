import { FiHelpCircle } from "react-icons/fi";

function FaqItem({ faqs }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white/80 p-6">
      <div className="flex items-start gap-3">
        <FiHelpCircle className="mt-1 h-5 w-5 shrink-0 text-purple-600" />
        <div className="flex flex-col gap-3">
          <h3 className="text-lg sm:text-xl">{faqs.question}</h3>
          <p className="text-gray-600">{faqs.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default FaqItem;
