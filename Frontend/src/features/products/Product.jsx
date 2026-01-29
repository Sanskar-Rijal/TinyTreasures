import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../../services/apiProduct";
import Spinner from "../../ui/Spinner";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import CustomPagination from "../Pagination/CustomPagination";

function Product() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "All";
  const page = Number(searchParams.get("page")) || 1;
  const keyword = searchParams.get("keyword") || "";
  const limit = 8; // number of products per page

  const { isPending, data, error, isSuccess } = useQuery({
    queryKey: ["products", category, page, keyword],
    queryFn: () => getAllProducts({ category, page, limit, keyword }), //our Backend uses 1 for first page
  });

  const products = data?.message?.products ?? [];
  const totalProducts = data?.message?.filteredProductsCount ?? 0;

  return (
    <div className="relative mb-6 mb-8 min-h-[400px]">
      {/* Spinner overlay */}
      {isPending && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70">
          <Spinner />
        </div>
      )}
      {/* display error message */}
      {error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70">
          <p className="text-center text-lg font-semibold text-red-500 sm:text-xl md:text-2xl">
            {error.message}
          </p>
        </div>
      )}
      {/* Product grid stays mounted */}
      {isSuccess && products.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((item) => (
              <ProductCard product={item} key={item._id} />
            ))}
          </div>

          <CustomPagination totalProducts={totalProducts} limit={limit} />
        </>
      )}
    </div>
  );
}

export default Product;
