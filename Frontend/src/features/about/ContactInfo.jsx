import { ADDRESS, EMAIL, PHONENO } from "../../utils/Constants";

function ContactInfo() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white/80 p-6">
      <h2 className="mb-4 text-lg font-semibold sm:text-xl">Get in Touch</h2>
      <div className="space-y-3 text-gray-600">
        <p>
          <strong className="text-gray-900">Email:</strong> {EMAIL}
        </p>
        <p>
          <strong className="text-gray-900">Phone:</strong> {PHONENO}
        </p>
        <p>
          <strong className="text-gray-900">Address:</strong> {ADDRESS}
        </p>
      </div>
    </div>
  );
}

export default ContactInfo;
