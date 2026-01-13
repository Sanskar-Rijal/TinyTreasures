import BackToXyz from "../ui/BackToXyz";
import { useSelector } from "react-redux";

import PleaseLogin from "../ui/PleaseLogin";
import UserProfileCard from "../features/Profile /UserProfileCard";
import { PiPackage } from "react-icons/pi";
import Button from "../ui/Button";
import OrderHistoryCard from "../features/Profile /OrderHistoryCard";
import AccountActions from "../features/Profile /AccountActions";

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
      </div>
        {/* Account Actions  */}
        <AccountActions />
    </div>
  );
}

export default UserProfile;
