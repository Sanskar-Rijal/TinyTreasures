import { FaRegUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import Loader from "../../ui/Loader";
import { useState } from "react";

function ProfileInfo() {
  const nameFromStore = useSelector((state) => state?.user?.user?.name ?? "");
  const emailFromStore = useSelector((state) => state?.user?.user?.email ?? "");
  const avatarFromStore = useSelector(
    (state) => state?.user?.user?.avatar?.url ?? "",
  );
  //state for showing currently selected picture
  const [selectedImage, setSelectedImage] = useState(null);

  //using react hook form
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      name: nameFromStore,
      email: emailFromStore,
    },
  });

  const { updateNameEmail, isPending: isUpdatingProfile } = useUpdateProfile();

  const { dirtyFields } = formState;

  //function to handle image change
  function handleImageChange(event) {
    event.preventDefault();
    //console.log(event.target.files[0]);
    const file = event.target.files[0];
    if (!file) return;
    //creating image url to show selected image
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
  }

  function handleNameEmail(data) {
    console.log(data.avatar[0]);
    //if user uploaded new image then we need to send that as well to backend
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    if (data.avatar && data.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    }
    updateNameEmail(formData); //{name,email} and photo
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white/80 p-6">
      {isUpdatingProfile && <Loader />}
      <div className="mb-9 flex items-center gap-4">
        <FaRegUser className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900 md:text-xl">
          Profile Information
        </h3>
      </div>
      <form onSubmit={handleSubmit(handleNameEmail)}>
        <div className="space-y-4">
          {/* show user avatar and button to change avatar  */}
          <div className="mb-9 flex items-center gap-4">
            {/* show existing avatar  */}
            <div className="h-15 w-15 overflow-hidden rounded-full border border-gray-300">
              <img
                src={selectedImage || avatarFromStore}
                alt="user avatar"
                className="h-full w-full object-cover"
              />
            </div>
            <input
              {...register("avatar", {
                onChange: handleImageChange,
              })}
              type="file"
              className="hidden"
              id="avatar"
              accept="image/*"
            />
            {/* Button to trigger file input */}
            <label
              htmlFor="avatar"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all hover:cursor-pointer hover:bg-purple-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              Change Photo
            </label>
          </div>

          {/* full name */}
          <div>
            <label
              className="mb-2 block font-semibold text-gray-900"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              {...register("name")}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-2 py-2 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
              id="name"
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
            disabled={Object.keys(dirtyFields).length === 0 && !selectedImage}
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
