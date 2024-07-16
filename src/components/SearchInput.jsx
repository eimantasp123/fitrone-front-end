import { useEffect, useRef, useState } from "react";
import { MdSearch } from "react-icons/md";
import { ThreeDots } from "react-loader-spinner";
import PropTypes from "prop-types";
import ImageWithSkeleton from "./common/ImageWithSkeleton";

const SearchInput = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const containerRef = useRef(null);
  const abortControllerRef = useRef(null);

  const fetchSearchResults = async (query, signal) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (signal.aborted) {
          reject(new DOMException("Aborted", "AbortError"));
        } else {
          const result = [
            { id: 1, name: "John Doe", gym: "Gold's Gym", online: true, image: "https://via.placeholder.com/50" },
            { id: 2, name: "Jane Doe", gym: "Fitness World", online: false, image: "https://via.placeholder.com/50" },
            { id: 3, name: "John Smith", gym: "Anytime Fitness", online: true, image: "https://via.placeholder.com/50" },
            { id: 4, name: "John Smith", gym: "Fitness World", online: false, image: "https://via.placeholder.com/50" },
            { id: 5, name: "John Smith", gym: "Fitness World", online: false, image: "https://via.placeholder.com/50" },
            { id: 6, name: "John Smith", gym: "Fitness World", online: false, image: "https://via.placeholder.com/50" },
            { id: 7, name: "John Smith", gym: "Fitness World", online: false, image: "https://via.placeholder.com/50" },
            { id: 8, name: "John Smith", gym: "Fitness World", online: false, image: "https://via.placeholder.com/50" },
            { id: 9, name: "John Smith", gym: "Fitness World", online: false, image: "https://via.placeholder.com/50" },
            { id: 10, name: "John Smith", gym: "Fitness World", online: false, image: "https://via.placeholder.com/50" },
            { id: 11, name: "John Smith", gym: "Fitness World", online: false, image: "https://via.placeholder.com/50" },
            { id: 12, name: "John Smith", gym: "Gold's Gym", online: true, image: "https://via.placeholder.com/50" },
          ].filter((client) => client.name.toLowerCase().includes(query.toLowerCase()));
          resolve(result);
        }
      }, 1000);
    });
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (query.length > 2) {
      setLoading(true);
      setShowResults(true);

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const results = await fetchSearchResults(query, controller.signal);
        setSearchResults(results);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    } else {
      setShowResults(false);
      setSearchResults([]);
      setLoading(false);
    }
  };

  const handleClickOutside = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setShowResults(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative min-w-[250px] max-w-[50%] ${className} mx-auto  `}>
      <div className="flex items-center  ">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <MdSearch className="text-gray-600 text-xl" />
        </div>
        <input
          value={searchQuery}
          onChange={handleSearch}
          type="text"
          placeholder="Search for your clients"
          className={`w-full py-2 px-14  ${
            searchQuery.length > 2 && showResults
              ? " rounded-tl-[20px] rounded-tr-[20px] focus:border-t-1 shadow-none focus:border-l-1 focus:border-r-1  border-b-transparent "
              : "rounded-full   transition-shadow duration-300 ease-in-out focus:shadow-custom-light2 "
          }    placeholder-gray-600  border  outline-none `}
        />
      </div>

      {showResults && searchQuery.length > 2 && (
        <div className="absolute left-0 right-0 z-10 border bg-white border-gray-200 border-b-1 border-l-1 border-t-0 border-r-1 rounded-b-[20px] max-h-[500px] overflow-y-auto scrollbar-none ">
          {loading ? (
            <div className="px-4 py-5 flex justify-center items-center">
              <ThreeDots color="#BBC22C" height={30} width={30} />
            </div>
          ) : searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <div
                key={result.id}
                className={`px-4 py-4 cursor-pointer flex items-center justify-between border-l-0 border-r-0 border-t-0 ${
                  index !== searchResults.length - 1 ? "border-b-[1px]" : ""
                } hover:bg-gray-50`}
              >
                <div className="flex items-center">
                  <ImageWithSkeleton src={result.image} size="40px" alt={result.name} />
                  <div>
                    <div className="font-semibold text-[15px] ">{result.name}</div>
                    <div className="text-[13px] mt-[-2px] text-gray-500">{result.gym}</div>
                  </div>
                </div>
                <div>
                  <span className={`text-sm ${result.online ? "text-green-500" : "text-red-500"}`}>
                    {result.online ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-6 flex justify-center items-center">No clients found</div>
          )}
        </div>
      )}
    </div>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
};

export default SearchInput;
