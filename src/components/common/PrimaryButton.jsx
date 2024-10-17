import PropTypes from "prop-types";

export default function PrimaryButton({
  text,
  type = "button",
  onClick,
  className = "",
  children,
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`w-full ${className} bg-primary ${
        disabled ? "cursor-not-allowed bg-primaryDark" : ""
      } mt-4 rounded-full py-2 text-sm font-semibold text-stone-800 transition-colors duration-300 ease-in-out hover:bg-primaryDark`}
    >
      {children || text}
    </button>
  );
}

PrimaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
};

// {/* <div className="container mx-auto h-[calc(100dvh-5rem)] max-h-[800px] w-full max-w-[1500px] p-4 3xl:mt-6">
//       {/* Container Content */}
//       <div
//         className={`absolute flex h-[600px] w-[1250px] flex-col items-center p-4 ${modalOpen ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" : ""} justify-center rounded-2xl border-[1.5px] border-dashed border-primary bg-background text-center transition-all duration-500 ease-in-out`}
//       >
//         <h1 className="mb-6 text-[22px] font-semibold text-textPrimary md:text-2xl lg:text-3xl">
//           Calculate Your Meal Balance ⚖️
//         </h1>
//         <p className="mb-4 max-w-[800px] text-textSecondary">
//           To find the best meals and suppliers for your goals, you first need to
//           calculate your daily balance of calories, protein, fats, and carbs.
//         </p>
//         <h2 className="mb-4 cursor-pointer text-lg font-bold">Steps</h2>

//         {/* Cards */}
//         <div className="mb-4 flex max-w-[1000px] items-center justify-center gap-4">
//           {cardDetails.map((card, index) => (
//             <div
//               key={index}
//               className="flex flex-1 flex-col items-center justify-center rounded-lg border border-borderPrimary p-8 shadow-custom-light4"
//             >
//               <span className="mb-2 flex size-6 items-center justify-center rounded-full bg-primary font-semibold text-black">
//                 {card.id}
//               </span>
//               <h3 className="font-semibold">{card.title}</h3>
//               <p className="text-sm text-textSecondary">{card.description}</p>
//             </div>
//           ))}
//         </div>

//         <button className="w-72 py-3" onClick={handleModalOpen}>
//           Start Balance Calculation
//         </button>
//       </div>
//     </div> */}
