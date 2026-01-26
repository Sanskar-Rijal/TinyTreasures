import { useState } from "react";
import useMoveBack from "../hooks/useMoveBack";
import Button from "../ui/Button";

function ForgotPassword() {
  const moveBack = useMoveBack();
  const [email, setEmail] = useState("");

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white/80 p-4">
        {/* welcome login to you account  */}
        <div className="space-y-1 pb-3 text-center">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Forgot Password
          </h1>
          <p className="text-sm text-gray-600">
            Enter your email to reset your password
          </p>
        </div>
        {/* email, passwords  and input field */}
        <div className="mt-0 p-6">
          <form className="space-y-4">
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
            <Button
              size="lg"
              disabled={!email}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              Send Reset Link
            </Button>
          </form>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <button
              onClick={moveBack}
              className="cursor-pointer text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
