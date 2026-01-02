import { STORE_NAME } from "../utils/Constants";

function Banner() {
  return (
    <div className="mb-12 rounded-2xl bg-linear-to-r from-violet-500 to-purple-600 p-6 text-white sm:p-8 md:p-12">
      <h1 className="mb-4 text-2xl font-bold sm:text-3xl">
        Welcome to {STORE_NAME}
      </h1>
      <p className="max-w-2xl text-base text-white/90 sm:text-lg">
        Discover the latest Products at amazing prices. Free shipping on all
        orders over Rupees 1500!!
      </p>
    </div>
  );
}

export default Banner;
