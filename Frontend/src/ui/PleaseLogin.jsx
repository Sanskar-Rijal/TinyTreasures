import Button from "./Button";

function PleaseLogin() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-purple-50 md:h-34 md:w-34">
          <span className="text-5xl">😭</span>
        </div>
        <h2 className="mb-4 text-xl font-semibold text-gray-900 sm:text-2xl md:text-3xl">
          Please Login to Access this page
        </h2>
        <p className="mb-4 text-gray-600">
          If you don't have an account, you can create one don't worry 😉
        </p>
        <Button
          size="lg"
          to="/login"
          className="inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          Go to Login
        </Button>
      </div>
    </div>
  );
}

export default PleaseLogin;
