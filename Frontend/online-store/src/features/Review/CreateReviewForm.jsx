import { useState } from "react";
import StarRating from "../../animations/StarRating";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useAddNewReview from "../../hooks/useAddNewReview";
import Loader from "../../ui/Loader";

function CreateReviewForm({ onClose }) {
  //to Get number of Stars Clicked
  const [count, setCount] = useState(0);
  const { register, handleSubmit } = useForm();
  //get product id from params
  const { productId } = useParams();
  const { isPending, newReview } = useAddNewReview({ onClose });
  console.log("Raiting selected:", count);

  function onSubmit(data) {
    const payload = {
      ...data,
      rating: count,
      product: productId,
    };

    newReview(payload);
  }

  return (
    <div className="mb-8 rounded-lg border border-gray-200 bg-white">
      {isPending && <Loader />}

      {/* Card Header */}
      <div className="mb-5 p-6">
        <h3 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
          Write your Review
        </h3>
      </div>
      {/* Card Content */}
      <div className="p-6 pt-0">
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          {/* text field to write review */}
          <div className="flex flex-col justify-between gap-4">
            <label className="text-lg font-semibold text-gray-900 sm:text-xl">
              Your Review
            </label>
            <textarea
              {...register("comment")}
              required
              id="comment"
              className="min-h-[120px] rounded-lg border border-gray-300 bg-white p-4 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
              placeholder="Share your experience with this product..."
            />
          </div>

          {/*Rating   stars */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
              Rating
            </h3>
            <StarRating maxRaiting={5} size={40} onSetCount={setCount} />
          </div>
          {/* Submit and Cancel Button  */}
          <div className="flex gap-2">
            <Button
              type="submit"
              size="lg"
              className="inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              Submit Review
            </Button>
            <Button
              size="lg"
              onClick={onClose}
              variant="back"
              className="inline-flex items-center justify-center rounded-full border border-gray-200 text-sm font-medium backdrop-blur transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateReviewForm;
