import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";

function CustomPagination({ totalProducts, limit }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
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
  );
}

export default CustomPagination;
