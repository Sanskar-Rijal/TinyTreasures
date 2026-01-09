import BackToXyz from "../ui/BackToXyz";
import { useSelector } from "react-redux";

import PleaseLogin from "../ui/PleaseLogin";
import UserProfileCard from "../features/Profile /UserProfileCard";
import { PiPackage } from "react-icons/pi";
import Button from "../ui/Button";
import OrderHistoryCard from "../features/Profile /OrderHistoryCard";

function UserProfile() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  if (!isAuthenticated) {
    return <PleaseLogin />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackToXyz label={"Back to Home"} to="/" />
      <h1 className="mb-4 text-xl font-semibold text-gray-900 sm:mb-8 sm:text-2xl md:text-3xl">
        My Account
      </h1>
      <div className="mb-6 md:mb-8 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
        {/* Profile Information Section  */}
        <UserProfileCard />
        {/* Show Order History  */}
        <OrderHistoryCard />
        {/* Account Actions  */}
      </div>
      <div className="max-w-6xl rounded-lg border border-gray-200 bg-white/80 p-6">
        <h3 className="text-lg font-semibold text-gray-900 md:text-xl mb-10 sm:mb-15 ">
          Account Actions
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
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
          variant="back"
          className="inline-flex w-full items-center justify-center rounded-lg border  border-red-300 text-red-400 text-sm font-medium backdrop-blur transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50 hover:bg-red-50 hover:text-red-700 "
        >
          Logout
        </Button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
