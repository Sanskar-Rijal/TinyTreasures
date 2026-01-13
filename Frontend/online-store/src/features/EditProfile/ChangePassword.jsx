import { LuLock } from "react-icons/lu";
import Button from "../../ui/Button";

function ChangePassword({ showPasswordForm, handleClick }) {
  function handlePassword(event) {
    event.preventDefault();
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white/80 p-6">
      <div className="flex flex-col justify-center gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <LuLock className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900 md:text-xl">
            Change Password
          </h3>
        </div>
        {!showPasswordForm && (
          <Button
            onClick={handleClick}
            variant="back"
            className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-gray-300 text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            Update Password
          </Button>
        )}
      </div>
      {showPasswordForm && (
        <form onSubmit={handlePassword}>
          <div className="mt-10 space-y-4">
            {/* current password */}
            <div>
              <label
                className="mb-2 block font-semibold text-gray-900"
                htmlFor="currentpassword"
              >
                Current Password
              </label>
              <input
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-2 py-2 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                id="currentpassword"
                type="password"
              />
            </div>
            {/* new password  */}
            <div>
              <label
                className="mb-2 block font-semibold text-gray-900"
                htmlFor="newpassword"
              >
                New Password
              </label>
              <input
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-2 py-2 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                id="newpassword"
                type="password"
              />
            </div>
            {/* confirm password  */}
            <div>
              <label
                className="mb-2 block font-semibold text-gray-900"
                htmlFor="confirmpassword"
              >
                Confirm Password
              </label>
              <input
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-2 py-2 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                id="confirmpassword"
                type="password"
              />
            </div>
            {/* Button for save changes  */}
            <div className="space-x-4">
              <Button
                type="submit"
                size="lg"
                className="inline-flex cursor-pointer items-center justify-center rounded-full text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                Change Password
              </Button>
              <Button
                size="lg"
                onClick={handleClick}
                variant="back"
                className="inline-flex cursor-pointer items-center justify-center rounded-full border border-gray-300 text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default ChangePassword;
