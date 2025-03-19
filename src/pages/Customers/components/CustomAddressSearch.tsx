import { capitalizeFirstLetter } from "@/utils/helper";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdSearch } from "react-icons/md";
import { SelectedPlace } from "./DrawerForCustomerAddAndEdit";
import GeneralModalToSearchAddressGuide from "@/components/GeneralModalToSearchAddressGuide";
import { useDisclosure } from "@chakra-ui/react";

interface CustomAddressSearchProps {
  selectedPlace: SelectedPlace | null;
  setSelectedPlace: React.Dispatch<React.SetStateAction<SelectedPlace | null>>;
  name: string;
  required?: boolean;
  disableForm?: boolean;
}

/**
 * Custom Address Search Component for the Customers Page
 */
const CustomAddressSearch: React.FC<CustomAddressSearchProps> = ({
  selectedPlace,
  setSelectedPlace,
  required = false,
  name,
  disableForm = false,
}) => {
  const { t } = useTranslation(["common", "auth", "customers"]);
  const [inputValue, setInputValue] = useState(""); // User's input
  const [showResults, setShowResults] = useState(false); // Show search results
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchCount, setSearchCount] = useState(0); // Search count
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]); // Predicted places
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const {
    setValue,
    register,
    formState: { errors },
    clearErrors,
  } = useFormContext();
  const containerRef = useRef<HTMLDivElement>(null);

  // Register the input in the form
  useEffect(() => {
    register(name);
  }, [register, name]);

  // Initialize Google services when the API is loaded
  useEffect(() => {
    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new google.maps.places.AutocompleteService();
    }
  }, []);

  // Close the results dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        cleanStates();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [containerRef]);

  // Fetch predictions based on the input value
  const fetchPredictions = () => {
    if (autocompleteService.current && inputValue.length > 0) {
      setSearchCount((prev) => prev + 1);
      autocompleteService.current.getPlacePredictions(
        { input: inputValue },
        (predictions) => {
          setShowResults(true);
          if (predictions) {
            setPredictions(predictions);
          } else {
            setPredictions([]);
          }
        },
      );
    } else {
      setShowResults(false);
      setSearchCount(0);
      setPredictions([]);
    }
  };

  // Fetch place details based on the selected prediction
  const handleSelectPrediction = (placeId: string) => {
    if (!placesService.current) {
      const placeholder = document.getElementById("google-maps-placeholder");
      if (placeholder) {
        placesService.current = new google.maps.places.PlacesService(
          placeholder as HTMLDivElement,
        );
      } else {
        return null;
      }
    }

    // Fetch place details based on `placeId`
    placesService.current?.getDetails({ placeId }, (place) => {
      if (place) {
        setSelectedPlace({
          address: place.formatted_address || "",
          latitude: place.geometry?.location?.lat().toFixed(6) || "",
          longitude: place.geometry?.location?.lng().toFixed(6) || "",
        });
        setValue(name, place.formatted_address || "");
        cleanStates();
      }
    });
  };

  // Clear the states
  const cleanStates = () => {
    setInputValue("");
    setPredictions([]);
    setShowResults(false);
  };

  // Clear the search results
  const cleanSearch = () => {
    cleanStates();
    setSelectedPlace(null);
  };

  return (
    <>
      <div ref={containerRef} className="relative">
        <div className="flex justify-between">
          <p className="flex items-center gap-1 pb-1 text-[13px] text-textPrimary">
            {t("customers:searchForAPlace")}{" "}
            {required ? <span className="text-red-500">*</span> : null}
          </p>

          <span
            className="cursor-pointer text-[13px] font-medium text-textPrimary"
            onClick={onOpen}
          >
            {t("helpToFindAddress")}
          </span>
        </div>

        {/* Input Field */}
        <div className="flex items-center">
          <div className="pointer-events-none absolute left-0 flex items-center pl-4">
            <MdSearch className="text-xl text-placeholder" />
          </div>
          <input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              clearErrors(name);
            }}
            name={name}
            type="text"
            placeholder={t("customers:searchAddressPlaceholder")}
            className={`w-full ${errors[name] ? "border-2 border-red-400 dark:border-red-400" : ""} bg-background px-12 py-3 text-sm dark:bg-background ${
              showResults
                ? "focus:border-t-1 focus:border-l-1 focus:border-r-1 rounded-tl-lg rounded-tr-lg border-b-transparent shadow-none"
                : "rounded-lg transition-shadow duration-300 ease-in-out focus:shadow-custom-light4"
            } border border-borderDark placeholder-placeholder outline-none dark:border-borderPrimary`}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              fetchPredictions();
            }}
            type="submit"
            disabled={disableForm}
            className={`absolute right-[2px] m-1 flex h-[34px] cursor-pointer items-center rounded-lg bg-primary px-4 text-sm text-black transition-colors duration-200 ease-in-out hover:bg-primaryLight dark:hover:bg-primaryDark`}
          >
            {t("search")}
          </button>
          {inputValue && (
            <span
              onClick={cleanSearch}
              className={`absolute right-[82px] m-1 flex h-[34px] cursor-pointer items-center rounded-lg bg-backgroundSecondary px-3 text-sm`}
            >
              <IoIosCloseCircleOutline className="text-lg" />
            </span>
          )}
        </div>

        {errors[name] && (
          <p className="mt-1 text-[13px] text-red-500 dark:text-red-400">
            {errors[name]?.message as string}
          </p>
        )}

        {!showResults && !selectedPlace && (
          <p className="flex items-center gap-1 pt-1 text-[13px] text-textSecondary">
            {t("customers:searchAddressPlaceholderNote")}
          </p>
        )}

        {/* Custom Results Dropdown */}
        {showResults && (
          <div
            onWheel={(e) => e.stopPropagation()}
            className="border-b-1 border-l-1 border-r-1 z-10 max-h-[200px] overflow-y-auto rounded-b-lg border border-t-0 border-borderPrimary bg-white scrollbar-thin dark:border-borderDark dark:bg-backgroundSecondary"
          >
            {predictions.length > 0 ? (
              predictions.map((result, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectPrediction(result.place_id)}
                  className={`flex w-full cursor-pointer flex-col gap-2 p-4 text-sm transition-colors duration-200 ease-in-out hover:bg-backgroundSecondary dark:bg-backgroundSecondary dark:hover:bg-background ${predictions.length === index + 1 ? "border-none" : "border-b-[1px]"}`}
                >
                  <div className="flex w-full items-end gap-1 font-medium md:items-center md:gap-3">
                    <span>{capitalizeFirstLetter(result.description)}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center gap-1 px-4 py-6 text-sm">
                <p className="font-semibold">{t("customers:noAddressFound")}</p>
                <p className="px-8 text-center">
                  {t("customers:noAddressFoundDescription")}
                </p>
              </div>
            )}
          </div>
        )}

        {showResults && predictions.length === 0 && searchCount > 3 && (
          <div className="mx-1 mt-3 flex flex-col items-center justify-center gap-2 rounded-lg bg-primary px-6 py-6 text-center text-sm text-black">
            <p className="">
              {t("customers:multipleTimeAddressNotFoundDescription")}
            </p>{" "}
            <span onClick={onOpen} className="cursor-pointer font-semibold">
              {t("customers:multipleTimeAddressNotFoundButton")}
            </span>
          </div>
        )}

        {/* Display Selected Place Details */}
        {selectedPlace && (
          <div className="relative mt-4 rounded-lg bg-backgroundSecondary p-4 text-[14px]">
            <p className="font-semibold">{t("common:selectedAddress")}:</p>
            <p>{selectedPlace.address}</p>
            <div className="mt-2 flex items-center gap-2 text-xs">
              <p>
                {t("common:latitude")}: {selectedPlace.latitude}
              </p>
              <p>
                {t("common:longitude")}: {selectedPlace.longitude}
              </p>
            </div>
            <span
              onClick={() => {
                setSelectedPlace(null);
                setValue(name, "");
              }}
              className={`absolute right-2 top-2 cursor-pointer text-sm`}
            >
              <IoIosCloseCircleOutline className="text-xl" />
            </span>
          </div>
        )}
      </div>

      {/* Google Address Search Guide Modal */}
      {isOpen && (
        <GeneralModalToSearchAddressGuide isOpen={isOpen} onClose={onClose} />
      )}
    </>
  );
};

export default CustomAddressSearch;
