import { IoIosArrowBack } from "react-icons/io";
import useMoveBack from "../hooks/useMoveBack";
import Button from "../ui/Button";
import ProductImages from "../features/products/ProductImages";
import ProductDescription from "../features/products/ProductDescription";
import { useSelector } from "react-redux";
import { useState } from "react";
import CreateReviewForm from "../features/Review/CreateReviewForm";
import Modal from "../ui/Modal";
import AddReview from "../features/Review/AddReview";
import { FaStar } from "react-icons/fa";
import { formatDate } from "../utils/Helpers";

function ProductDetail() {
  //go back to previous screeen
  const moveBack = useMoveBack();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticatd);

  //Show review Form
  const [showReviewForm, setShowReviewForm] = useState(false);

  function handleReviewForm() {
    setShowReviewForm((prev) => !prev);
  }

  const product = [
    {
      id: "abcd",
      name: "Kaam chalau knifee",
      price: 19000,
      description:
        "let it go let it go. Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality.",
      ratingsAverage: 5,
      ratingsQuantity: 100,
      reviews: [
        {
          _id: "69512e6dcac3c682d6229a38",
          user: {
            _id: "69512e55cac3c682d6229a32",
            name: "sansss",
            email: "rijalsanskar@gmail.com",
            role: "admin",
            id: "69512e55cac3c682d6229a32",
          },
          product: "69512c46c117731239452193",
          createdAt: "2025-12-28T13:13:49.307Z",
          rating: 3.4,
          comment: "ufff thikai xa teti ramro ni xaina hai hehhehe",
          id: "69512e6dcac3c682d6229a38",
        },
      ],
      images: [
        {
          public_id: "sample",
          url: "https://i.imgur.com/sWodf8f.jpg",
          id: "image1",
        },
        {
          public_id: "sample",
          url: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/knife-head_0-e1436fc.png",
          id: "image1",
        },
        {
          public_id: "sample",
          url: "https://i.imgur.com/sWodf8f.jpg",
          id: "image1",
        },
        {
          public_id: "sample",
          url: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/knife-head_0-e1436fc.png",
          id: "image1",
        },
      ],
      category: "Category kunai xaina pro ho",
      seller: "Samsung",
      stock: 10,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button  */}
      <Button
        onClick={moveBack}
        variant="back"
        className="mb-6 inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all hover:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 md:text-lg"
      >
        <IoIosArrowBack className="h-4 w-4" />
        Back to Products
      </Button>

      {/* product description photo etc */}
      <div className="mb-13 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        {/* product image  */}
        <ProductImages />
        {/* product details  */}
        <ProductDescription />
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
          {product[0].reviews.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white/80">
              <p className="p-8 text-center text-lg text-gray-600 sm:text-xl">
                No reviews yet. Be the first to review this product!
              </p>
            </div>
          ) : (
            product[0].reviews.map((review) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
