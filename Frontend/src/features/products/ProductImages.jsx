import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

//Used in Product Details Page to show all the images of the product

function ProductImages({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  function handleNextImage() {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }
  function handlePreviousImage() {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  return (
    <div className="space-y-4">
      <div className="group relative">
        <img
          className="h-64 w-full rounded-2xl object-cover sm:h-96 lg:h-[500px]"
          src={images[currentImageIndex].url}
          alt={images.id}
        />
        {/* give arrow to navigate between images */}
        {images.length > 1 && (
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
              {currentImageIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Allowing user to click on available images to view */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
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
