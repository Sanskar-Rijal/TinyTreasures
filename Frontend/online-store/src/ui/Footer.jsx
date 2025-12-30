import Button from "./Button";

function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* 1st col */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">
              About PurpleStore
            </h4>
            <p className="text-sm text-gray-600">
              Your trusted destination for the latest tech products at
              competitive prices
            </p>
          </div>
          {/* 2nd col */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>About us</li>
              <li>Contact us</li>
              <li>FAQs</li>
              <li>Shipping info</li>
            </ul>
          </div>
          {/* 3rd col */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">
              Customer Service
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Returns</li>
              <li>Track Order</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
          {/* 4th col */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">NewsLetter</h4>
            <p className="mb-4 text-sm text-gray-600">
              Subscribe to get updates on new products and offers.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                className="flex-1 rounded-full border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                type="email"
                placeholder="Your email address"
              />
              <Button className="inline-flex cursor-pointer items-center justify-center rounded-full text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        {/* copyright text */}
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2024 PurpleStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
