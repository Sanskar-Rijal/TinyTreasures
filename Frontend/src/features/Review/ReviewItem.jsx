import { FaStar } from "react-icons/fa";
import { formatDate } from "../../utils/Helpers";

function ReviewItem({ review }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      {/* user image and name  */}
      <div className="mb-4 flex items-center justify-start gap-2 md:gap-3">
        <div className="h-10 w-10 overflow-hidden rounded-full">
          <img
            src="https://i.imgur.com/sWodf8f.jpg"
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
        <p className="mb-1 text-lg text-gray-900 sm:text-xl md:text-2xl">
          {review.user.name}
        </p>
      </div>
      <div className="mb-4 flex items-center justify-start gap-3">
        {/* show stars */}
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={`h-5 w-5 ${index < Math.floor(review.rating) ? `fill-yellow-400 text-yellow-400` : `text-gray-300`} `}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">
          {formatDate(review.createdAt)}
        </span>
      </div>
      <p className="text-gray-600">{review.comment}</p>
    </div>
  );
}

export default ReviewItem;
