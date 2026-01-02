import { Link } from "react-router-dom";
import useMoveBack from "../hooks/useMoveBack";
import Button from "../ui/Button";

function Register() {
  const moveBack = useMoveBack();
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white/80 p-4">
        {/* welcome login to you account  */}
        <div className="space-y-1 pb-3 text-center">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Create Account
          </h1>
          <p className="text-sm text-gray-600">Sign up to start shopping</p>
        </div>
        {/* full name,email, passwords  and input field */}
        <div className="mt-0 p-6">
          <form className="space-y-4">
            {/* full name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block font-semibold text-gray-900"
              >
                Full Name
              </label>
              <input
                className="w-full rounded-xl border border-gray-200 bg-white px-2 py-2 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                type="text"
                required
                placeholder="April"
              />
            </div>
            {/* email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block font-semibold text-gray-900"
              >
                Email
              </label>

              <input
                className="w-full rounded-xl border border-gray-200 bg-white px-2 py-2 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                type="email"
                required
                placeholder="April@gmail.com"
              />
            </div>
            {/* password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block font-semibold text-gray-900"
              >
                Password
              </label>

              <input
                className="w-full rounded-xl border border-gray-200 bg-white px-2 py-2 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                type="password"
                required
                placeholder="Enter your password"
              />
            </div>

            {/* confirm password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block font-semibold text-gray-900"
              >
                Confirm Password
              </label>

              <input
                className="w-full rounded-xl border border-gray-200 bg-white px-2 py-2 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                type="password"
                required
                placeholder="Enter your final password"
              />
            </div>

            <Button
              size="lg"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              Create Account
            </Button>
          </form>

          {/* dont have an account signup section */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-sm font-bold text-purple-600 hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <button
              onClick={moveBack}
              className="cursor-pointer text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
