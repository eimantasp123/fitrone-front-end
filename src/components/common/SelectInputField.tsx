// import { useColorMode } from "@chakra-ui/react";
// import PropTypes from "prop-types";
// import { useEffect, useState } from "react";
// import { useFormContext } from "react-hook-form";

// const SelectInputField = ({
//   name,
//   label = "",
//   options = [],
//   placeholder = "Select an option",
//   disabled = false,
//   required = false,
// }) => {
//   const {
//     register,
//     getValues,
//     formState: { errors, isSubmitted },
//     setError,
//     clearErrors,
//   } = useFormContext();
//   const { colorMode } = useColorMode();
//   const [isPlaceholderSelected, setIsPlaceholderSelected] = useState(true);

//   const handleSelectChange = (e) => {
//     const isPlaceholder = e.target.value === "";
//     setIsPlaceholderSelected(isPlaceholder);

//     if (isPlaceholder && required && isSubmitted) {
//       setError(name, {
//         type: "manual",
//         message: `${label} is required`,
//       });
//     } else {
//       clearErrors(name);
//     }
//   };

//   useEffect(() => {
//     const currentValue = getValues(name);
//     if (currentValue !== undefined && currentValue !== "") {
//       setIsPlaceholderSelected(false);
//     }
//   }, [getValues, name]);

//   // Handle conditional classes for select styling
//   const getSelectClassNames = () => {
//     let classNames = `w-full  border  bg-background transition-colors duration-300 ease-out  px-4 py-[12px] rounded-md leading-tight outline-none appearance-none pr-8`;

//     // Apply placeholder color manually
//     if (isPlaceholderSelected) {
//       classNames += " text-stone-500";
//     } else {
//       classNames += " text-textPrimary";
//     }

//     if (disabled) {
//       classNames += ` bg-background text-stone-500 cursor-not-allowed ${
//         colorMode === "light" ? "border-[#d4d4d4]" : "border-[#272727]"
//       } `;
//     }

//     if (errors[name]) {
//       classNames += ` border-red-500 focus:border-red-500 bg-border`;
//     } else {
//       classNames +=
//         colorMode === "light"
//           ? ` bg-background border-[#b6b6b6] placeholder-stone-500 focus:border-textPrimary`
//           : ` bg-background border-[#494949] placeholder-stone-500 focus:border-[#e6e6e6]`;
//     }

//     return classNames;
//   };

//   return (
//     <>
//       {/* Select field */}
//       <div>
//         {label && (
//           <label
//             className="mb-2 block pl-1 text-sm text-textPrimary"
//             htmlFor={name}
//           >
//             {label}
//             <span className="text-red-600"> {required && "*"}</span>
//           </label>
//         )}

//         {/* Select element */}
//         <div className="relative">
//           <select
//             className={getSelectClassNames()}
//             id={name}
//             {...register(name)}
//             disabled={disabled}
//             onChange={handleSelectChange}
//             style={{
//               color: isPlaceholderSelected ? "#78716c" : "", // "stone-500" equivalent
//             }}
//           >
//             <option value="" style={{ color: "#78716c" }}>
//               {placeholder}
//             </option>
//             {options.map((option, index) => (
//               <option
//                 style={
//                   colorMode === "dark"
//                     ? { color: "#e7e5e4" }
//                     : { color: "#000" }
//                 }
//                 key={index}
//                 value={option.value}
//               >
//                 {option.label}
//               </option>
//             ))}
//           </select>

//           {/* Dropdown arrow */}
//           <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
//             <svg
//               className="h-5 w-5 text-stone-500"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M19 9l-7 7-7-7"
//               />
//             </svg>
//           </div>
//         </div>

//         {/* Error message */}
//         {errors[name] && (
//           <div className="flex">
//             <span className="mt-1 text-[13px] text-red-500">
//               {errors[name].message}
//             </span>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// SelectInputField.propTypes = {
//   name: PropTypes.string.isRequired,
//   label: PropTypes.string,
//   options: PropTypes.arrayOf(
//     PropTypes.shape({
//       value: PropTypes.string.isRequired,
//       label: PropTypes.string.isRequired,
//     }),
//   ).isRequired,
//   placeholder: PropTypes.string,
//   disabled: PropTypes.bool,
//   required: PropTypes.bool,
// };

// export default SelectInputField;
