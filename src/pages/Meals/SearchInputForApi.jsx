import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { MdSearch } from "react-icons/md";
import { ThreeDots } from "react-loader-spinner";

const API = "ed9afe7e4cmshcbae909f59db7dep197148jsne6fae57c3307";

export const SearchInputForApi = ({ className, setIngredients }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [amount, setAmount] = useState(100);
  const [unit, setUnit] = useState("grams");
  const containerRef = useRef(null);

  // Search for ingredients
  const handleSearch = async () => {
    setLoading(true);
    setShowResults(true);
    try {
      const url =
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/search?query=" +
        searchQuery;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-key": API,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setSearchResults(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Get ingredients informations by id
  const getIngredientInfo = async (id) => {
    setShowResults(false);
    setSearchQuery("");
    try {
      const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/${id}/information?amount=${amount}&unit=${unit}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-key": API,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      const nutrientValues = data.nutrition.nutrients;
      const ingredient = {
        id: data.id,
        name: data.name,
        amount: data.amount,
        unit: data.unitShort,
        nutrients: {
          calories: nutrientValues.find(
            (nutrient) => nutrient.name === "Calories",
          ).amount,
          protein: nutrientValues.find(
            (nutrient) => nutrient.name === "Protein",
          ).amount,
          fat: nutrientValues.find((nutrient) => nutrient.name === "Fat")
            .amount,
          carbs: nutrientValues.find(
            (nutrient) => nutrient.name === "Carbohydrates",
          ).amount,
        },
      };
      setIngredients((prev) => [...prev, ingredient]);
    } catch (error) {
      console.error(error);
    } finally {
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
    <div className="w-full">
      <div
        ref={containerRef}
        className={`relative min-w-[200px] ${className} mx-auto`}
      >
        <div className="flex items-center">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <MdSearch className="text-xl text-placeholder" />
          </div>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search ingredients"
            className={`w-full px-12 py-2 text-sm ${
              searchQuery.length > 2 && showResults
                ? "focus:border-t-1 focus:border-l-1 focus:border-r-1 rounded-tl-lg rounded-tr-lg border-b-transparent shadow-none"
                : "rounded-lg transition-shadow duration-300 ease-in-out focus:shadow-custom-light4"
            } border border-borderPrimary placeholder-placeholder outline-none`}
          />
          <span
            onClick={handleSearch}
            className={`absolute right-0 flex h-full cursor-pointer items-center bg-primary px-4 text-sm text-black ${showResults ? "rounded-tr-lg" : "rounded-r-lg"}`}
          >
            Search
          </span>
        </div>

        {showResults && searchQuery.length > 2 && (
          <div className="border-b-1 border-l-1 border-r-1 absolute left-0 right-0 z-10 max-h-[200px] overflow-y-auto rounded-b-lg border border-t-0 border-borderPrimary bg-white scrollbar-thin">
            {loading ? (
              <div className="flex items-center justify-center px-4 py-5">
                <ThreeDots color="#BBC22C" height={30} width={30} />
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <div
                  key={result.id}
                  onClick={() => getIngredientInfo(result.id)}
                  className={`flex cursor-pointer items-center justify-between border-l-0 border-r-0 border-t-0 px-4 py-2 ${
                    index !== searchResults.length - 1 ? "border-b-[1px]" : ""
                  } hover:bg-gray-50`}
                >
                  <div className="">{result.name}</div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center px-4 py-6">
                No ingredients found
              </div>
            )}
          </div>
        )}
      </div>
      <div className="mt-3 flex w-full items-center gap-4 text-nowrap">
        <div className="flex items-center gap-3">
          <span className="text-xs">Amount</span>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="h-8 w-[100px] flex-1 rounded-lg border border-borderPrimary px-2 py-[3px] text-sm outline-none"
          />
        </div>
        {/*  */}
        <div className="flex items-center gap-3">
          <span className="text-xs">Units</span>
          <div className="flex flex-1 items-center gap-1 text-xs">
            <div
              onClick={() => setUnit("grams")}
              className={`flex flex-1 cursor-pointer items-center ${unit === "grams" ? "bg-secondary text-white dark:bg-primary dark:text-black" : "border bg-transparent"} justify-center rounded-full px-4 py-1`}
            >
              Grams
            </div>
            <div
              onClick={() => setUnit("milliliters")}
              className={`flex flex-1 cursor-pointer items-center justify-center rounded-full ${unit === "milliliters" ? "bg-secondary text-white dark:bg-primary dark:text-black" : "border bg-transparent"} px-4 py-1`}
            >
              Milliliters
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SearchInputForApi.propTypes = {
  className: PropTypes.string,
  setIngredients: PropTypes.func,
};
