// import { useEffect, useRef, useState } from "react";
// import { MdSearch } from "react-icons/md";
// import { ThreeDots } from "react-loader-spinner";
// import PropTypes from "prop-types";

// interface SearchInputProps {
//   className?: string;
// }

// const SearchInput: React.FC<SearchInputProps> = ({ className }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const containerRef = useRef(null);
//   const abortControllerRef = useRef(null);

//   const fetchSearchResults = async (query: string, signal: unknown) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         if (signal.aborted) {
//           reject(new DOMException("Aborted", "AbortError"));
//         } else {
//           const result = [
//             {
//               id: 1,
//               name: "John Doe",
//               gym: "Gold's Gym",
//               online: true,
//               image: "https://via.placeholder.com/50",
//             },
//             {
//               id: 2,
//               name: "Jane Doe",
//               gym: "Fitness World",
//               online: false,
//               image: "https://via.placeholder.com/50",
//             },
//             {
//               id: 3,
//               name: "John Smith",
//               gym: "Anytime Fitness",
//               online: true,
//               image: "https://via.placeholder.com/50",
//             },
//             {
//               id: 4,
//               name: "John Smith",
//               gym: "Fitness World",
//               online: false,
//               image: "https://via.placeholder.com/50",
//             },
//             {
//               id: 5,
//               name: "John Smith",
//               gym: "Fitness World",
//               online: false,
//               image: "https://via.placeholder.com/50",
//             },
//             {
//               id: 6,
//               name: "John Smith",
//               gym: "Fitness World",
//               online: false,
//               image: "https://via.placeholder.com/50",
//             },
//             {
//               id: 7,
//               name: "John Smith",
//               gym: "Fitness World",
//               online: false,
//               image: "https://via.placeholder.com/50",
//             },
//             {
//               id: 8,
//               name: "John Smith",
//               gym: "Fitness World",
//               online: false,
//               image: "https://via.placeholder.com/50",
//             },
//             {
//               id: 9,
//               name: "John Smith",
//               gym: "Fitness World",
//               online: false,
//               image: "https://via.placeholder.com/50",
//             },
//             {
//               id: 10,
//               name: "John Smith",
//               gym: "Fitness World",
//               online: false,
//               image: "https://via.placeholder.com/50",
//             },
//             {
//               id: 11,
//               name: "John Smith",
//               gym: "Fitness World",
//               online: false,
//               image: "https://via.placeholder.com/50",
//             },
//             {
//               id: 12,
//               name: "John Smith",
//               gym: "Gold's Gym",
//               online: true,
//               image: "https://via.placeholder.com/50",
//             },
//           ].filter((client) =>
//             client.name.toLowerCase().includes(query.toLowerCase()),
//           );
//           resolve(result);
//         }
//       }, 1000);
//     });
//   };

//   const handleSearch = async (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);

//     if (query.length > 2) {
//       setLoading(true);
//       setShowResults(true);

//       try {
//         const results = await fetchSearchResults(query, controller.signal);
//         setSearchResults(results);
//       } catch (error) {
//         if (error.name !== "AbortError") {
//           console.error("Fetch error:", error);
//         }
//       } finally {
//         if (!controller.signal.aborted) {
//           setLoading(false);
//         }
//       }
//     } else {
//       setShowResults(false);
//       setSearchResults([]);
//       setLoading(false);
//     }
//   };

//   const handleClickOutside = (e) => {
//     if (containerRef.current && !containerRef.current.contains(e.target)) {
//       setShowResults(false);
//       setSearchQuery("");
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className={`relative min-w-[200px] max-w-[650px] ${className} mx-auto`}
//     >
//       <div className="flex items-center">
//         <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
//           <MdSearch className="text-xl text-gray-600" />
//         </div>
//         <input
//           value={searchQuery}
//           onChange={handleSearch}
//           type="text"
//           placeholder="Search what you're looking for"
//           className={`w-full px-14 py-2 ${
//             searchQuery.length > 2 && showResults
//               ? "focus:border-t-1 focus:border-l-1 focus:border-r-1 rounded-tl-[20px] rounded-tr-[20px] border-b-transparent shadow-none"
//               : "rounded-full transition-shadow duration-300 ease-in-out focus:shadow-custom-light2"
//           } border placeholder-gray-600 outline-none`}
//         />
//       </div>

//       {showResults && searchQuery.length > 2 && (
//         <div className="border-b-1 border-l-1 border-r-1 absolute left-0 right-0 z-10 max-h-[500px] overflow-y-auto rounded-b-[20px] border border-t-0 border-gray-200 bg-white scrollbar-none">
//           {loading ? (
//             <div className="flex items-center justify-center px-4 py-5">
//               <ThreeDots color="#BBC22C" height={30} width={30} />
//             </div>
//           ) : searchResults.length > 0 ? (
//             searchResults.map((result, index) => (
//               <div
//                 key={result.id}
//                 className={`flex cursor-pointer items-center justify-between border-l-0 border-r-0 border-t-0 px-4 py-4 ${
//                   index !== searchResults.length - 1 ? "border-b-[1px]" : ""
//                 } hover:bg-gray-50`}
//               >
//                 <div className="flex items-center">
//                   <div>
//                     <div className="text-[15px] font-semibold">
//                       {result.name}
//                     </div>
//                     <div className="mt-[-2px] text-[13px] text-gray-500">
//                       {result.gym}
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <span
//                     className={`text-sm ${result.online ? "text-green-500" : "text-red-500"}`}
//                   >
//                     {result.online ? "Online" : "Offline"}
//                   </span>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="flex items-center justify-center px-4 py-6">
//               No clients found
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// SearchInput.propTypes = {
//   className: PropTypes.string,
// };

// export default SearchInput;
