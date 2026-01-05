import Button from "../ui/Button";
import ProductImages from "../features/products/ProductImages";
import ProductDescription from "../features/products/ProductDescription";
import { useSelector } from "react-redux";
import { useState } from "react";
import CreateReviewForm from "../features/Review/CreateReviewForm";
import Modal from "../ui/Modal";
import AddReview from "../features/Review/AddReview";
import BackToXyz from "../ui/BackToXyz";
import ReviewItem from "../features/Review/ReviewItem";
import { useParams } from "react-router-dom";
import useProductById from "../hooks/useProductById";
import Loader from "../ui/Loader";

function ProductDetail() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticatd);

  //Show review Form
  const [showReviewForm, setShowReviewForm] = useState(false);

  //useParams hoook to get product id from url
  const { productId } = useParams();

  //Calling the api to get product details by id
  const { isPending, data } = useProductById({ id: productId });

  const product = data?.message ?? {};

  function handleReviewForm() {
    setShowReviewForm((prev) => !prev);
  }

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button  */}
      <BackToXyz label="Back to Products " />

      {/* product description photo etc */}
      <div className="mb-13 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        {/* product image  */}
        <ProductImages images={product.images} />
        {/* product details  */}
        <ProductDescription product={product} />
      </div>
      {/* Review Section */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">
            Customer Reviews
          </h2>
          {isAuthenticated ? (
            // <Button
            //   size="lg"
            //   variant="back"
            //   onClick={handleReviewForm}
            //   className="inline-flex items-center justify-center rounded-xl border border-gray-200 text-sm font-medium backdrop-blur transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            // >
            //   Write a Review
            // </Button>
            <AddReview />
          ) : (
            <Button
              to="/login"
              size="lg"
              variant="back"
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 text-sm font-medium backdrop-blur transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              Login to Review
            </Button>
          )}
        </div>
        {/* Review Form Goes here */}
        {showReviewForm && (
          <Modal onClose={handleReviewForm}>
            <CreateReviewForm />
          </Modal>
        )}
        {/* Show list of available reviews */}

        <div className="space-y-4">
          {product?.reviews?.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white/80">
              <p className="p-8 text-center text-lg text-gray-600 sm:text-xl">
                No reviews yet. Be the first to review this product!
              </p>
            </div>
          ) : (
            product?.reviews?.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
