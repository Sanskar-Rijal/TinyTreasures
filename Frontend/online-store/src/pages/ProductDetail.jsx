import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdAdd,
  IoMdRemove,
} from "react-icons/io";
import useMoveBack from "../hooks/useMoveBack";
import Button from "../ui/Button";
import ProductImages from "../features/products/ProductImages";
import ProductDescription from "../features/products/ProductDescription";
import { useSelector } from "react-redux";

function ProductDetail() {
  //go back to previous screeen
  const moveBack = useMoveBack();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticatd);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button  */}
      <Button
        onClick={moveBack}
        variant="back"
        className="mb-6 inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all hover:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
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
            <Button
              size="lg"
              variant="back"
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 text-sm font-medium backdrop-blur transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              Write a Review
            </Button>
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
      </div>
    </div>
  );
}

export default ProductDetail;
