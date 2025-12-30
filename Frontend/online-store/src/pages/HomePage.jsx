import { useState } from "react";
import Button from "../ui/Button";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = [
    "All",
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  //handle click on category
  function handleCategory(category) {
    setSelectedCategory(category);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* banner section */}
      <div className="mb-12 rounded-2xl bg-linear-to-r from-violet-500 to-purple-600 p-6 text-white sm:p-8 md:p-12">
        <h1 className="mb-4 text-2xl font-bold sm:text-3xl">
          Welcome to PurpleShop
        </h1>
        <p className="max-w-2xl text-base text-white/90 sm:text-lg">
          Discover the latest Products at amazing prices. Free shipping on all
          orders over Rupees 1500!!
        </p>
      </div>
      {/* category section */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 sm:text-xl md:text-2xl">
          Shop by Category
        </h2>
        {categories.map((item) => (
          <Button
            key={item}
            onClick={() => handleCategory(item)}
            variant={selectedCategory === item ? `default` : `ghost`}
            className={`mx-2 my-2 inline-flex items-center justify-center rounded-full text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${selectedCategory === item ? `border-0 bg-purple-600 text-white hover:bg-purple-700` : `border border-gray-300 hover:bg-gray-300`}`}
          >
            {item}
          </Button>
        ))}
      </div>
      {/* Product section to be fetched from backend and display here */}

      {/* features Section */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* 1st column */}
        <div className="rounded-xl bg-purple-50 p-6 text-center">
          {/* making circle then inside emoji */}
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600">
            <span className="text-2xl text-white">🚚</span>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900 md:text-xl">
            Free Shipping
          </h3>
          <p className="text-sm text-gray-600">On all orders above Rs 1500</p>
        </div>
        {/* 2nd col */}
        <div className="rounded-xl bg-purple-50 p-6 text-center">
          {/* making circle then inside emoji */}
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600">
            <span className="text-2xl text-white">🔒</span>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900 md:text-xl">
            Secure Payment
          </h3>
          <p className="text-sm text-gray-600">100% secure transactions</p>
        </div>
        {/* 3rd column */}
        <div className="rounded-xl bg-purple-50 p-6 text-center">
          {/* making circle then inside emoji */}
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600">
            <span className="text-2xl text-white">↩️</span>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900 md:text-xl">
            Easy Return
          </h3>
          <p className="text-sm text-gray-600">7-day return policy</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
