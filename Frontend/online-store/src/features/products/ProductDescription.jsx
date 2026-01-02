import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import { useState } from "react";
import Badge from "../../ui/Badge";
import Button from "../../ui/Button";

function ProductDescription() {
  const [iswishlisted, setWishListed] = useState(false);
  function handleWishList(e) {
    e.preventDefault();
    e.stopPropagation();
    setWishListed((prev) => !prev);
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
    <div>
      <Badge className="mb-4" variant="secondary">
        {product[0].category}
      </Badge>
      <h1 className="mb-4 text-3xl font-semibold text-gray-900 sm:text-4xl md:text-5xl">
        {product[0].name}
      </h1>
      {/* showing rating i.e stars */}
      <div className="mb-3 flex items-center gap-2">
        {/* show stars */}
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={`h-5 w-5 ${index < Math.floor(product[0].ratingsAverage) ? `fill-yellow-400 text-yellow-400` : `text-gray-300`} `}
            />
          ))}
        </div>
        {/* show Total number of ratings */}
        <span className="text-sm text-gray-600">
          {product[0].ratingsAverage.toFixed(1)}
        </span>
        <span className="text-sm text-gray-600">
          ({product[0].reviews.length} Reviews)
        </span>
      </div>

      {/* Showing Price of the Product */}
      <div className="mb-6">
        <span className="text-2xl text-purple-600 sm:text-3xl">
          Rs {product[0].price.toFixed(2)}
        </span>
      </div>
      {/* Description of the product */}
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">
          Description
        </h3>
        <p className="leading-relaxed text-gray-600">
          {product[0].description}
        </p>
      </div>
      {/* Quantity Selector */}
      <div className="mb-6">
        <h3 className="mb-3 text-lg text-gray-900 sm:text-xl">Quantity</h3>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-2 py-1">
            <Button
              size="lg"
              variant="back"
              className="inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              <IoMdRemove className="h-5 w-5" />
            </Button>
            <span>2</span>
            <Button
              size="lg"
              variant="back"
              className="inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              <IoMdAdd className="h-5 w-5" />
            </Button>
          </div>
          <span className="text-gray-600">Total: Rs 15000</span>
        </div>
      </div>
      {/* Add to cart button or wishlist */}
      <div className="flex flex-row gap-4">
        <Button
          disabled={!(product[0].stock > 0)}
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
      {product[0].stock > 0 ? (
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
