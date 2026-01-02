import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

//Used in Product Details Page to show all the images of the product

function ProductImages() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  function handleNextImage() {
    setCurrentImageIndex((prev) => (prev + 1) % product[0].images.length);
  }
  function handlePreviousImage() {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + product[0].images.length) % product[0].images.length,
    );
  }

  const product = [
    {
      id: "abcd",
      name: "Sanskar Rijal",
      price: 19000,
      description: "let it go let it go",
      ratingsAverage: 5,
      ratingsQuantity: 100,
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
      stock: 50,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="group relative">
        <img
          className="h-64 w-full rounded-2xl object-cover sm:h-96 lg:h-[500px]"
          src={product[0].images[currentImageIndex].url}
          alt={product.name}
        />
        {/* give arrow to navigate between images */}
        {product[0].images.length > 1 && (
          <>
            <button
              onClick={handlePreviousImage}
              className="absolute top-1/2 left-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-900 opacity-0 shadow-lg transition-all group-hover:opacity-100 hover:bg-white"
              aria-label="Previous image"
            >
              {/* left arrow */}
              <IoIosArrowBack className="h-6 w-6" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-900 opacity-0 shadow-lg transition-all group-hover:opacity-100 hover:bg-white"
              aria-label="Next Image"
            >
              {/* right arrow */}
              <IoIosArrowForward className="h-6 w-6" />
            </button>
            {/* Image Counter */}
            <div className="absolute right-4 bottom-4 rounded-full bg-gray-900/70 px-3 py-1 text-sm text-white">
              {currentImageIndex + 1} / {product[0].images.length}
            </div>
          </>
        )}
      </div>

      {/* Allowing user to click on available images to view */}
      {product[0].images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {product[0].images.map((image, index) => (
            <button
              className={`relative overflow-hidden rounded-lg border-2 transition-all ${index === currentImageIndex ? `border-purple-600` : `border-gray-200 hover:border-purple-400`}`}
              onClick={() => setCurrentImageIndex(index)}
              key={index}
            >
              <img className="h-20 w-full object-cover" src={image.url} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductImages;
