import { FiHelpCircle } from "react-icons/fi";
import BackToXyz from "../ui/BackToXyz";
import FaqItem from "../features/FAQ/FaqItem";

function FAQ() {
  const faqs = [
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping typically takes 5-7 business days. Express shipping (2-3 business days) is available for an additional fee. Free shipping is available on orders over Rs 1500.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "Users can make payment via Khalti. If you don't have Khalti go and make an account.",
    },
    {
      question: "Can I return a product?",
      answer:
        "Yes! We offer a 7-day return policy. Products must be in original condition with all packaging and accessories. See our Returns page for more details.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Currently, we only ship within Nepal. We are working on expanding international shipping soon.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order ships, you will receive an email with a tracking number. You can also check your order status by logging into your account.",
    },
    {
      question: "Are your products authentic?",
      answer:
        "Absolutely! We source all our products directly from manufacturers or authorized distributors. Every product comes with a warranty and authenticity guarantee.",
    },
    {
      question: "What if I receive a damaged product?",
      answer:
        "Contact our customer support immediately with photos of the damage. We will arrange a replacement or full refund at no cost to you.",
    },
    {
      question: "Can I change or cancel my order?",
      answer:
        "You can modify or cancel your order within 24 hours of placement. After that, if the order has been shipped, you can return it following our return policy.",
    },
  ];

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
