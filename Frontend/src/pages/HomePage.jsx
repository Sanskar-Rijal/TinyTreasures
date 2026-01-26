import Button from "../ui/Button";
import Product from "../features/products/Product";
import Features from "../ui/Features";
import Banner from "../ui/Banner";
import { useSearchParams } from "react-router-dom";

function HomePage() {
  //Setting title of our page
  //const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";
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
    // const params = {};
    // if (category !== "All") {
    //   params.category = category;
    // }
    // params.page = 1; //reset the page
    // setSearchParams(params);
    setSearchParams((prev) => {
      const params = Object.fromEntries(prev);

      if (category === "All") {
        delete params.category;
      } else {
        params.category = category;
      }

      params.page = 1; //reset the page when cagtegory changes
      return params;
    });
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
      <Product />
      {/* features Section */}
      <Features />
    </div>
  );
}

export default HomePage;
