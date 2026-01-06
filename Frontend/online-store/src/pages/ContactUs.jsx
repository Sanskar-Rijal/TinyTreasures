import ContactInfo from "../features/about/ContactInfo";
import BackToXyz from "../ui/BackToXyz";
import Button from "../ui/Button";

function ContactUs() {
  return (
    <div className="container mx-auto px-4 py-6">
      <BackToXyz label={"Move Back"} />
      <h1 className="mb-8 text-xl font-semibold text-gray-900 sm:text-2xl md:text-3xl">
        Contact Us
      </h1>
      {/* Show form on right side and contact info on left side  */}
      <div className="grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white/80 p-6 lg:col-span-2">
          <h3 className="mb-4 text-lg sm:text-xl md:text-2xl">
            Send us a message
          </h3>
          <form>
            <div className="space-y-4">
              {/* contact us form body  */}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* full name  */}
                <div className="space-y-2">
                  <label
                    htmlFor="fullName"
                    className="block font-semibold text-gray-900"
                  >
                    FullName
                  </label>
                  <input
                    id="fullName"
                    className="w-full rounded-xl border border-gray-200 bg-white px-2 py-2 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    type="text"
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                {/* phone no  */}

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block font-semibold text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    className="w-full rounded-xl border border-gray-200 bg-white px-2 py-2 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    type="email"
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Email ADdresss */}
              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="block font-semibold text-gray-900"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  className="w-full rounded-xl border border-gray-200 bg-white px-2 py-2 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  type="text"
                  required
                  placeholder="Enter the subject"
                />
              </div>
              {/* text field to write review */}
              <div className="space-y-2">
                <label className="block font-semibold text-gray-900">
                  Message
                </label>
                <textarea
                  required
                  id="message"
                  className="min-h-[120px] w-full rounded-lg border border-gray-300 bg-white p-4 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  placeholder="Share your experience with this product..."
                />
              </div>
              <Button
                className="inline-flex w-full items-center justify-center gap-2 rounded-full text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                size="lg"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
        <div className="lg:col-span-1">
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
