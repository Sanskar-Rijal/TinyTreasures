import useLogout from "../../hooks/useLogout";
import Button from "../../ui/Button";

function AccountActions() {
  //custom hook to logout user
  const { logout, isPending: isLoggingOut } = useLogout();
  return (
    <div className="max-w-6xl rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-10 text-lg font-semibold text-gray-900 sm:mb-15 md:text-xl">
        Account Actions
      </h3>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button
          size="lg"
          to="/wishlist"
          variant="back"
          className="inline-flex w-full items-center justify-center rounded-lg border border-gray-300 text-sm font-medium backdrop-blur transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          View Wishlist
        </Button>
        <Button
          size="lg"
          variant="back"
          className="inline-flex w-full items-center justify-center rounded-lg border border-gray-300 text-sm font-medium backdrop-blur transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          Enable Dark Mode
        </Button>
        <Button
          size="lg"
          onClick={logout}
          disabled={isLoggingOut}
          variant="back"
          className="inline-flex w-full items-center justify-center rounded-lg border border-red-300 text-sm font-medium text-red-400 backdrop-blur transition-all hover:bg-red-50 hover:text-red-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default AccountActions;
