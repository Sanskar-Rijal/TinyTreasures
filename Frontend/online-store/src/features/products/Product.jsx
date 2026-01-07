import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../../services/apiProduct";
import Spinner from "../../ui/Spinner";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";

function Product() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "All";
  const page = Number(searchParams.get("page")) || 1;
  const limit = 5; // number of products per page

  const { isPending, data, error } = useQuery({
    queryKey: ["products", category, page],
    queryFn: () => getAllProducts({ category, page: page, limit }), //our Backend uses 1 for first page
  });

  const products = data?.message?.products ?? [];
  const totalProducts = data?.message?.filteredProductsCount ?? 0;
  //No of pages we display on frontend
  //page 1 page 2 page 3... total pages
  const totalPages = Math.ceil(totalProducts / limit);

  function handlePageClick(event) {
    setSearchParams((prev) => {
      const params = Object.fromEntries(prev);
      params.page = event.selected + 1;
      return params;
    });
  }

  return (
    <>
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((item) => (
            <ProductCard product={item} key={item._id} />
          ))}
        </div>
      </div>
      {/* pagination UI */}
      <div className="mb-8">
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          pageCount={totalPages}
          forcePage={page - 1}
          onPageChange={handlePageClick}
          containerClassName="flex justify-center gap-2 mt-4"
          pageClassName=""
          pageLinkClassName="px-4 py-2 border rounded cursor-pointer hover:bg-purple-200  hover:border-purple-500"
          activeLinkClassName="bg-purple-600 text-white border-purple-600 hover:bg-purple-600"
          previousLinkClassName="px-4 py-2 border rounded  hover:bg-purple-200  hover:border-purple-500"
          nextLinkClassName="px-4 py-2 border rounded  hover:bg-purple-200  hover:border-purple-500"
          disabledLinkClassName="opacity-50 cursor-not-allowed text-gray-500 hover:bg-white"
        />
      </div>
    </>
  );
}

export default Product;
