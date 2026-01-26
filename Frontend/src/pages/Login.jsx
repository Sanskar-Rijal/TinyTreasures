import { Link } from "react-router-dom";
import useMoveBack from "../hooks/useMoveBack";
import Button from "../ui/Button";
import useLogin from "../hooks/useLogin";
import { useForm } from "react-hook-form";
import Loader from "../ui/Loader";

function Login() {
  //custom hook to move back to previous page
  const moveBack = useMoveBack();
  const { login, isPending } = useLogin();
  const { register, handleSubmit } = useForm();

  //function to handle onSubmit
  function onSubmit(data) {
    login(data); //{email and password}
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      {/* Loading Animation */}
      {isPending && <Loader />}

      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white/80 p-4">
        {/* welcome login to you account  */}
        <div className="space-y-1 pb-3 text-center">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-600">
            Login to your account to continue
          </p>
        </div>
        {/* email, passwords  and input field */}
        <div className="mt-0 p-6">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block font-semibold text-gray-900"
              >
                Email
              </label>
              <input
                {...register("email")}
                id="email"
                className="w-full rounded-xl border border-gray-200 bg-white px-2 py-2 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                type="email"
                required
                placeholder="Enter your email"
              />
            </div>
            {/* password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block font-semibold text-gray-900"
                >
                  Password
                </label>
                <Link
                  to="/forgotPassword"
                  className="text-sm font-semibold text-purple-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                {...register("password")}
                id="password"
                className="w-full rounded-xl border border-gray-200 bg-white px-2 py-2 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                type="password"
                required
                placeholder="Enter your password"
              />
            </div>
            <Button
              type="submit"
              disabled={isPending}
              size="lg"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              Login
            </Button>
          </form>

          {/* dont have an account signup section */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Dont have an account?{" "}
              <Link
                to="/registerUser"
                className="text-sm font-bold text-purple-600 hover:underline"
              >
                Register here
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

export default Login;
