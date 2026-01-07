import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Search({ laptop = false, mobile = false }) {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  function submitHandler(event) {
    event.preventDefault();
  }

useEffect(() => {
  const timer = setTimeout(() => {
    if (keyword.trim()) {
      navigate(`/?keyword=${keyword.trim()}`);
    } else {
      navigate(`/`);
    }
  }, 400); // delay in ms 

  return () => clearTimeout(timer); // cleanup
}, [keyword, navigate]);
  return (
    <>
      {/* //for laptpo */}
      {laptop && (
        <div className="mx-8 hidden max-w-md flex-1 md:flex">
          <form onSubmit={submitHandler} className="w-full">
            <div className="relative w-full">
              <FaSearch className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full rounded-3xl border border-gray-200 bg-white py-2 pr-4 pl-10 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                type="text"
                placeholder="Search Products....."
              />
            </div>
          </form>
        </div>
      )}
      {/* mobile Search bar */}
      {mobile && (
        <div className="mt-4 md:hidden">
          <form onSubmit={submitHandler} className="w-full">
            <div className="relative w-full">
              <FaSearch className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
              <input
                value={keyword}
                className="w-full rounded-3xl border border-gray-200 bg-white py-2 pr-4 pl-10 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                type="text"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search Products....."
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Search;
