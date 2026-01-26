import { useSelector } from "react-redux";
import BackToXyz from "../ui/BackToXyz";
import Button from "../ui/Button";
import ProductCard from "../features/products/ProductCard";

function WishList() {
  const wishItems = useSelector((state) => state.wish.wishItems);

  if (wishItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-purple-50 md:h-34 md:w-34">
            <span className="text-5xl">💜</span>
          </div>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 sm:text-2xl md:text-3xl">
            Your wishlist is empty
          </h2>
          <p className="mb-8 text-gray-600">
            Add some products to get started!
          </p>
          <Button
            size="lg"
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-6">
      <BackToXyz label="Move Back" />
      <h1 className="mb-4 text-xl font-semibold text-gray-900 sm:text-2xl md:text-3xl">
        Wishlist ({wishItems.length} items)
      </h1>
        {/* show items and order summary in grid layout */}
         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishItems.map((item) => (
              <ProductCard product={item} key={item._id} />
            ))}
          </div>
    </div>
  );
}

export default WishList;
