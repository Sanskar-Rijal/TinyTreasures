import { FcProcess } from "react-icons/fc";
import BackToXyz from "../ui/BackToXyz";
import LastUpdated from "../features/Help/LastUpdated";
import InformationCollection from "../features/Returns and Refund/InformationCollection";
import UseInformation from "../features/Returns and Refund/UseInformation";
import InformationSharing from "../features/Returns and Refund/InformationSharing";
import Rights from "../features/Returns and Refund/Rights";
import UsableCard from "../features/Returns and Refund/UsableCard";
import ContactInfo from "../features/about/ContactInfo";

function Help() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="mb-8 text-xl font-semibold text-gray-900 sm:text-2xl md:text-3xl">
        Privacy Policy
      </h1>
      <BackToXyz label="Move Back" />

      <div className="max-w-4xl space-y-4">
        {/* first card  */}
        <LastUpdated />
        {/* Second Card  */}
        <InformationCollection />
        {/* Third Card  */}
        <UseInformation />
        {/* Fourth Card  */}
        <InformationSharing />
        {/* fifthCard */}
        <Rights />
        {/* sixth card */}
        <UsableCard
          title="Data Security"
          description={
            "We implement industry-standard security measures to protect your information. However, no method of transmission over the internet is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security."
          }
        />
        {/* seventh Card  */}
        <UsableCard
          title={"Cookies"}
          description={
            "We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie preferences through your browser settings."
          }
        />
      </div>
    </div>
  );
}

export default Help;
