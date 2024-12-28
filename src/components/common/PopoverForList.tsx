// import { Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from "@chakra-ui/react";
// import React from "react";

// const PopoverForList: React.FC = () => {
//   return (
//     <Popover>
//             <PopoverTrigger>
//               <button className="text-nowrap text-xs font-medium dark:text-neutral-200">
//                 {t("preferencesTitle")}
//               </button>
//             </PopoverTrigger>
//             <PopoverContent sx={{ maxWidth: "270px" }}>
//               <PopoverCloseButton />
//               <PopoverHeader>{t("selected")}:</PopoverHeader>
//               <PopoverBody>
//                 <div className="flex flex-wrap gap-2 text-xs">
//                   {preferences.length > 0 ? (
//                     preferences.map((preference) => {
//                       const translatedPreference = dietaryPreferences.find(
//                         (item) => item.key === preference,
//                       )?.title;

//                       return (
//                         <span
//                           key={preference}
//                           className="rounded-full bg-backgroundLight px-[10px] py-[2px] text-textPrimary dark:bg-neutral-800"
//                         >
//                           {translatedPreference || preference}
//                         </span>
//                       );
//                     })
//                   ) : (
//                     <span className="rounded-full bg-backgroundLight px-[10px] py-[2px] text-textPrimary dark:bg-neutral-800">
//                       {t("noPreferences")}
//                     </span>
//                   )}
//                 </div>
//               </PopoverBody>
//             </PopoverContent>
//           </Popover>
//   );
// };

// export default PopoverForList;
