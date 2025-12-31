import { Link } from "react-router-dom";
import Button from "./Button";
import { FaRegHeart, FaHeart, FaRegStar, FaStar } from "react-icons/fa";
import { useState } from "react";
import Badge from "./Badge";

function ProductCard({ product }) {
  const [iswishlisted, setWishListed] = useState(false);

  function handleWishList(e) {
    e.preventDefault();
    e.stopPropagation();
    setWishListed((prev) => !prev);
  }

  return (
    <Link
      to="/productDetails"
      className="group cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-400/10"
    >
      {/* product image */}
      <div className="relative h-48 overflow-hidden sm:h-56 md:h-60">
        <img
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={product.images[0].url}
          alt={product.name}
        />
        {/* Button to add to Wishlist */}
        <Button
          variant="like"
          size="icon"
          onClick={handleWishList}
          className={`absolute top-2 right-2 inline-flex items-center justify-center rounded-full text-sm font-medium backdrop-blur transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${iswishlisted ? `text-red-500` : ``} `}
        >
          {iswishlisted ? (
            <FaHeart className="h-4 w-4" />
          ) : (
            <FaRegHeart className="h-4 w-4" />
          )}
        </Button>
      </div>
      {/* product details */}
      <div className="p-4">
        {/* showing category */}
        <div className="mb-2">
          <Badge variant="secondary">{product.category}</Badge>
        </div>
        {/* product name */}
        <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-gray-900">
          {product.name}
        </h3>
        {/* showing rating */}
        <div className="mb-3 flex items-center gap-2">
          {/* show stars */}
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`h-5 w-5 ${index < Math.floor(product.ratingsAverage) ? `fill-yellow-400 text-yellow-400` : `text-gray-300`} `}
              />
            ))}
          </div>
          {/* show Total number of ratings */}
          <span className="text-sm text-gray-600">
            ({product.ratingsQuantity})
          </span>
        </div>
        {/* displaying price of the product  and Add to cart button */}
        <div className="flex flex-col justify-between gap-2">
          <span className="text-lg font-semibold text-purple-600 sm:text-xl">
            Rs {product.price.toFixed(2)}
          </span>
          <Button className="inline-flex cursor-pointer items-center justify-center rounded-full text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50">
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
