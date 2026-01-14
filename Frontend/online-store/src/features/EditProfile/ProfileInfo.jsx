import { FaRegUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import Loader from "../../ui/Loader";

function ProfileInfo() {
  const nameFromStore = useSelector((state) => state?.user?.user?.name ?? "");
  const emailFromStore = useSelector((state) => state?.user?.user?.email ?? "");

  //using react hook form
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      name: nameFromStore,
      email: emailFromStore,
    },
  });

  const { updateNameEmail, isPending: isUpdatingProfile } = useUpdateProfile();

  const { isDirty } = formState;

  function handleNameEmail(data) {
    updateNameEmail(data); //{name,email}
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white/80 p-6">
      {isUpdatingProfile && <Loader />}
      <div className="mb-10 flex items-center gap-4">
        <FaRegUser className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900 md:text-xl">
          Profile Information
        </h3>
      </div>
      <form onSubmit={handleSubmit(handleNameEmail)}>
        <div className="space-y-4">
          {/* full name */}
          <div>
            <label
              className="mb-2 block font-semibold text-gray-900"
              htmlFor="fullname"
            >
              Full Name
            </label>
            <input
              {...register("name")}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-2 py-2 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
              id="fullname"
              type="text"
            />
          </div>
          {/* email  */}
          <div>
            <label
              className="mb-2 block font-semibold text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email")}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-2 py-2 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
              id="email"
              type="email"
            />
          </div>
          {/* Button for save changes  */}
          <Button
            disabled={!isDirty}
            type="submit"
            size="lg"
            className="inline-flex cursor-pointer items-center justify-center rounded-full text-sm font-medium transition-all focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProfileInfo;
