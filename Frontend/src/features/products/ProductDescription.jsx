import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import { useState } from "react";
import Badge from "../../ui/Badge";
import Button from "../../ui/Button";
import QuantitySelector from "../../ui/QuantitySelector";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../ReduxSlices/cartSlice";
import { addToWish, removeFromWish } from "../../ReduxSlices/wishSlice";

function ProductDescription({ product }) {
  let [iswishlisted, setWishListed] = useState(false);
  const dispatch = useDispatch();
  const ProductQuantity = useSelector(
    (state) =>
      state.cart.orderItems.find((item) => item.product === product.id)
        ?.quantity || 0,
  );

  //check whether product is in wishlist or not
  iswishlisted = useSelector((state) =>
    state.wish.wishItems.find((item) => item.id === product.id),
  )
    ? true
    : false;

  function handleWishList(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!iswishlisted) {
      //if true then add to wishlist
      dispatch(addToWish(product));
    } else {
      //remove from wishlist
      dispatch(removeFromWish(product.id));
    }
    setWishListed((prev) => !prev);
  }

  function handleAddToCart() {
    const productItem = {
      product: product.id,
      quantity: 1,
      price: product.price,
      name: product.name,
      category: product.category,
      image: product.images[0].url,
    };
    dispatch(addToCart(productItem));
  }

  return (
    <div>
      <Badge className="mb-4 text-sm md:text-[14px]" variant="secondary">
        {product.category}
      </Badge>
      <h1 className="mb-4 text-3xl font-semibold text-gray-900 sm:text-4xl md:text-5xl">
        {product.name}
      </h1>
      {/* showing rating i.e stars */}
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
          {product.ratingsAverage.toFixed(1)}
        </span>
        <span className="text-sm text-gray-600">
          ({product.reviews.length} Reviews)
        </span>
      </div>

      {/* Showing Price of the Product */}
      <div className="mb-6">
        <span className="text-2xl text-purple-600 sm:text-3xl">
          Rs {product.price.toFixed(2)}
        </span>
      </div>
      {/* Description of the product */}
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">
          Description
        </h3>
        <p className="leading-relaxed text-gray-600">{product.description}</p>
      </div>
      {/* Quantity Selector */}
      <div className="mb-6">
        <h3 className="mb-3 text-lg text-gray-900 sm:text-xl">Quantity</h3>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <QuantitySelector quantity={ProductQuantity} product={product.id} />
          <span className="text-gray-600">Total: Rs 15000</span>
        </div>
      </div>
      {/* Add to cart button or wishlist */}
      <div className="flex flex-row gap-4">
        <Button
          onClick={handleAddToCart}
          disabled={!(product.stock > 0)}
          size="lg"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          <LuShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
        </Button>

        {/* wishlist button  */}
        <Button
          size="lg"
          variant="back"
          onClick={handleWishList}
          className={`inline-flex items-center justify-center rounded-xl border border-gray-200 text-sm font-medium backdrop-blur transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${iswishlisted ? `border-red-400 text-red-500` : ``} `}
        >
          {iswishlisted ? (
            <FaHeart className="h-4 w-4" />
          ) : (
            <FaRegHeart className="h-4 w-4" />
          )}
        </Button>
      </div>
      {/* Showing Stock Status */}
      {product.stock > 0 ? (
        <p className="mt-4 text-sm text-green-600">
          ✓ In Stock - Ready to ship
        </p>
      ) : (
        <p className="mt-4 text-sm text-red-600">Out of Stock Sorry!!</p>
      )}
    </div>
  );
}

export default ProductDescription;
