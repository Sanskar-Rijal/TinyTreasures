import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//function to delete images from Cloudinary
export const deleteCloudinaryImages = async (images) => {
  if (!images || images.length === 0) return;

  const deletePromises = images.map((image) =>
    cloudinary.uploader.destroy(image.public_id),
  );

  await Promise.all(deletePromises);
};

export default cloudinary;
