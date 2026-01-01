import { useState } from "react";
import Button from "../ui/Button";
import Product from "../features/products/Product";
import Features from "../ui/Features";
import Banner from "../ui/Banner";

function HomePage() {
  //Setting title of our page

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

  // const product = [
  //   {
  //     id: "abcd",
  //     name: "Sanskar Rijal",
  //     price: 19000,
  //     description: "let it go let it go",
  //     ratingsAverage: 5,
  //     ratingsQuantity: 100,
  //     images: [
  //       {
  //         public_id: "sample",
  //         url: "https://i.imgur.com/sWodf8f.jpg",
  //         id: "image1",
  //       },
  //     ],
  //     category: "Category kunai xaina pro ho",
  //     seller: "Samsung",
  //     stock: 50,
  //   },
  // ];

  //React Query to fetch api

  //handle click on category
  function handleCategory(category) {
    setSelectedCategory(category);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* banner section */}
      <Banner />
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
      <Product category={selectedCategory === "All" ? "" : selectedCategory} />
      {/* features Section */}
      <Features />
    </div>
  );
}

export default HomePage;
