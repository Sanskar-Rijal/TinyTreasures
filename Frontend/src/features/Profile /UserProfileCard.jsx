import { FaRegUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import Button from "../../ui/Button";

function UserProfileCard() {
  const name = useSelector((state) => state?.user?.user?.name ?? "");
  const email = useSelector((state) => state?.user?.user?.email ?? "");
  return (
    <div className="rounded-lg border border-gray-200 bg-white/80">
      <div className="p-6 pb-4">
        {/* iconn and profile info header  */}
        <div className="mb-10 flex items-center gap-4">
          <FaRegUser className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900 md:text-xl">
            Profile Information
          </h3>
        </div>
        {/* display name and email of user  */}
        <div className="mb-4 space-y-4">
          <div>
            <p className="mb-1 text-sm text-gray-600">Name</p>
            <p className="text-gray-900">{name}</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-gray-600">Email</p>
            <p className="text-gray-900">{email}</p>
          </div>
        </div>
        {/* Button to edit profile  */}
        <Button
          to="/userProfile/editProfile"
          size="lg"
          variant="back"
          className="inline-flex w-full items-center justify-center rounded-lg border border-gray-300 text-sm font-medium backdrop-blur transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          Edit Profile
        </Button>
      </div>
    </div>
  );
}

export default UserProfileCard;
