import { LuTarget, LuUsersRound } from "react-icons/lu";
import BackToXyz from "../ui/BackToXyz";
import { STORE_NAME } from "../utils/Constants";
import { FaAward } from "react-icons/fa";
import AboutItem from "../features/about/AboutItem";
import ContactInfo from "../features/about/ContactInfo";

function About() {
  const values = [
    {
      title: "Customer First",
      icon: <LuUsersRound className="h-5 w-5 text-purple-600" />,
      description: "  We prioritize customer satisfaction above all else",
    },
    {
      title: "Innovation",
      icon: <LuTarget className="h-5 w-5 text-purple-600" />,
      description: "Bringing you the latest and greatest in technology",
    },
    {
      title: "Quality",
      icon: <FaAward className="h-5 w-5 text-purple-600" />,
      description: "Only authentic products from trusted brands",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <BackToXyz label={"Move Back"} />
      <h1 className="mb-8 text-xl font-semibold text-gray-900 sm:text-2xl md:text-3xl">
        About {STORE_NAME}
      </h1>
      {/* Introduction about the store. */}
      <div className="mb-8 rounded-lg border border-gray-200 bg-white/80 p-6">
        <h2 className="mb-4 text-lg font-semibold sm:text-xl">Who we are</h2>
        <p className="mb-4 text-gray-600">
          Welcome to {STORE_NAME}, your premier destination for cutting-edge
          technology products. Founded in 2025, we've quickly become a trusted
          name in online electronics retail.
        </p>
        <p className="mb-4 text-gray-600">
          Our mission is to provide our customers with the latest tech products
          at competitive prices, backed by exceptional customer service and a
          seamless shopping experience.
        </p>
      </div>
      {/* values  */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {values.map((item) => (
          <AboutItem key={item.title} item={item} />
        ))}
      </div>
      {/* Contact Info */}
      <ContactInfo />
    </div>
  );
}

export default About;
