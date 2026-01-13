import { FaRegUser } from "react-icons/fa";
import BackToXyz from "../ui/BackToXyz";
import Button from "../ui/Button";
import { useSelector } from "react-redux";
import PleaseLogin from "../ui/PleaseLogin";
import ProfileInfo from "../features/EditProfile/ProfileInfo";
import ChangePassword from "../features/EditProfile/ChangePassword";
import { useState } from "react";

function EditUser() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  function onUpdatePassword() {
    setShowPasswordForm((prev) => !prev);
  }

  if (!isAuthenticated) {
    return <PleaseLogin />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <BackToXyz label={"Move Back"} />
      <h1 className="mb-4 text-xl font-semibold text-gray-900 sm:mb-8 sm:text-2xl md:text-3xl">
        Edit Profile
      </h1>
      {/* Card to change username and email  */}
      <div className="max-w-2xl space-y-4">
        <ProfileInfo />
        <ChangePassword
          showPasswordForm={showPasswordForm}
          handleClick={onUpdatePassword}
        />
      </div>
    </div>
  );
}

export default EditUser;
